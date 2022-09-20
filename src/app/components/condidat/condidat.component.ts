import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/api/customer';
import { Product } from 'src/app/api/product';
import { CustomerService } from 'src/app/service/customerservice';
import { ProductService } from 'src/app/service/productservice';

@Component({
  selector: 'app-condidat',
  templateUrl: './condidat.component.html',

})
export class CondidatComponent implements OnInit {

    customers1: Customer[];
    loading:boolean = true;
    @ViewChild('filter') filter: ElementRef;
    form: FormGroup = new FormGroup({});
    UserDialog: boolean;
    public categories: any = ['B', 'A', 'A1', 'C', 'D', 'B+E', 'C+E', 'D+E', 'H'];
    public bureaux: any = ['Menzel temime', 'Nabeul', 'Kélibiya', 'Autres...'];
    valExamen: string;
    valTypeContrat:string;
    valTContratCond:string;
    valPieceFournie: string[] = [];
    selectedDatenaiss:any;
    selectedDateAvSys:any;
    submitted = false;
    imageSrc: string = '';
    files:any;

    constructor(private customerService: CustomerService){}
    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
    }


    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    openNew() {
        //this.user = {};
        //this.submitted = false;
        this.UserDialog = true;
    }
    hideDialog() {
        this.UserDialog = false;
        /* this.updateUserDialog =false;
        this.submitted = false; */
    }
    onFileChange(event:any) {
        const reader = new FileReader();
        if(event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.imageSrc = reader.result as string;
            this.form.patchValue({
              fileSource: reader.result
            });
          };
        }
        this.files = event.target.files[0]
    }
    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }




    /* public categories: any = ['B', 'A', 'A1', 'C', 'D', 'B+E', 'C+E', 'D+E', 'H'];
    public bureaux: any = ['Menzel temime', 'Nabeul', 'Kélibiya', 'Autres...'];
    valExamen: string;
    valTypeContrat:string;
    valTContratCond:string;
    valPieceFournie: string[] = [];
    selectedDatenaiss:any;
    selectedDateAvSys:any;
    submitted = false;
    form: FormGroup = new FormGroup({});
    imageSrc: string = '';
    files:any;

    ngOnInit() {
    }

    onFileChange(event:any) {
        const reader = new FileReader();
        if(event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.imageSrc = reader.result as string;
            this.form.patchValue({
              fileSource: reader.result
            });
          };
        }
        this.files = event.target.files[0]
    }
    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    } */
}
