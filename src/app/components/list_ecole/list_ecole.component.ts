import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { CONSTANTES } from 'src/app/constantes/constantes';
import { School } from 'src/app/model/schools.model';
import { SchoolService } from 'src/app/service/school/school.service';
import { Product } from '../../api/product';
import { ProductService } from '../../service/productservice';

@Component({
    templateUrl: './list_ecole.component.html',
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class ListComponent implements OnInit {

    form_school: FormGroup = new FormGroup({});
    SchoolDialog: boolean;
    school: School;
    submitted = false;
    schools: School[] ;
    status: string[] = ['active', 'inactive'];
    deleteSchoolDialog: boolean = false;
    errors: any = null;
    URLSchholPic=CONSTANTES.URLSchholPic;
    defaultPicSchool=CONSTANTES.defaultSchoolImage;


    products: Product[];
    sortOptions: SelectItem[];
    sortOrder: number;
    sortField: string;
    sourceCities: any[];
    targetCities: any[];
    orderCities: any[];

    constructor(
        private productService: ProductService,
        public fb: FormBuilder,
        public schoolservice: SchoolService,
        private toastr: ToastrService,
        ) {}

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);
        this. getListSchool();

        this.sourceCities = [
            {name: 'San Francisco', code: 'SF'},
            {name: 'London', code: 'LDN'},
            {name: 'Paris', code: 'PRS'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Berlin', code: 'BRL'},
            {name: 'Barcelona', code: 'BRC'},
            {name: 'Rome', code: 'RM'}];
        this.targetCities = [];

        this.orderCities = [
            {name: 'San Francisco', code: 'SF'},
            {name: 'London', code: 'LDN'},
            {name: 'Paris', code: 'PRS'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Berlin', code: 'BRL'},
            {name: 'Barcelona', code: 'BRC'},
            {name: 'Rome', code: 'RM'}];

        this.sortOptions = [
            {label: 'Nom Croisson', value: 'Name'},
            {label: 'Nom Decroisson', value: '!Name'}
        ];

        this.form_school = this.fb.group(
            {
                Name: ['', Validators.required],
                phone: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(20),
                    ],
                ],
                email: ['', [Validators.required, Validators.email]],
                address: ['', Validators.required],
                status: ['active', Validators.required],

            }
        );

    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }



    /**By maro  */

    getListSchool(){
        this.schoolservice.getAllSchool().subscribe({
            next: (listSchool) => {
                this.schools = listSchool
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });
    }

    DeleteSchool(school:School){
        this.deleteSchoolDialog = true;
        this.school = {...school};
    }

    confirmDelete(){
        this.deleteSchoolDialog = false;
        this.schoolservice.deleteSchoolService(this.school).subscribe(
            data => {
              this.getListSchool();
              this.toastr.info("école supprimer avec succèes !", "Suppression");
            },
            (error) => {
                this.errors = error.error;
                this.toastr.error(this.errors)
            },
          );
    }

    SaveSchool() {
        this.submitted = true;
            this.schoolservice.add(this.form_school.value).subscribe(
                (data) => {
                    this.getListSchool();
                    this.form_school.reset();
                    this.SchoolDialog = false;
                    this.school = {};
                    this.toastr.info("Donnée ajouter avec succée","Info")
                },
                (err) => {
                  this.toastr.error(err.message,"Error")
                  console.log(err.message)
                }
            );

    }

    get f(): { [key: string]: AbstractControl } {
        return this.form_school.controls;
    }

    openNew() {
        this.school = {};
        this.submitted = false;
        this.SchoolDialog = true;
    }

    hideDialog() {
        this.submitted = false;
        this.SchoolDialog = false;
    }
}
