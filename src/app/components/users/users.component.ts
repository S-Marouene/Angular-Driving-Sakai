import { Component, Input, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { UserService } from '../../service/users.service';
import { User } from 'src/app/model/users.model';
import { AuthService } from 'src/app/shared-auth/auth.service';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Validation from 'src/app/utils/validation';
import { ToastrService } from 'ngx-toastr';
import { SchoolService } from 'src/app/service/school/school.service';
import { School } from 'src/app/model/schools.model';
import { CONSTANTES } from 'src/environments/environment';

@Component({
    templateUrl: './users.component.html',
    selector: 'app-users',
    providers: [MessageService],
    styleUrls: ['../../../assets/demo/badges.scss'],

})
export class UsersComponent implements OnInit {
    errors: any = null;
    UserDialog: boolean;
    updateUserDialog:boolean;
    deleteUserDialog: boolean = false;
    user: User;
    cols: any[];
    statuses: any[];
    rowsPerPageOptions = [5, 10, 20];
    users: User[] = [];
    submitted = false;
    school:School;
    schools: School[] ;
    form: FormGroup = new FormGroup({});
    imageSrc: string = '';
    files:any;

    @Input() UserProfile!:User;

    URLprofilePic=CONSTANTES.URLprofilePic;

    private roles: any = ['super-admin', 'admin', 'user'];

    filteredSchool: any[];

    constructor(
        private userService: UserService,
        public authService: AuthService,
        public fb: FormBuilder,
        public router: Router,
        private toastr: ToastrService,
        public schoolservice: SchoolService,
        private activatedroute:ActivatedRoute,
    ) {}


    product:any;
    ngOnInit() {
        this.refreshListUser();

        this.authService.profileUser().subscribe((data: any) => {
            this.UserProfile = data;
            if(this.UserProfile.role=="super-admin"){
                this.getListeSchool();
            }
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'status', header: 'Status' },
            { field: 'file', header: 'File' },
            { field: 'image', header: 'image' },
            { field: 'school_name', header: 'school_name' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' },
        ];

        this.form = this.fb.group(
            {
                name: ['', Validators.required],
                fname: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(20),
                    ],
                ],
                email: ['', [Validators.required, Validators.email]],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(40),
                    ],
                ],
                password_confirmation: ['', Validators.required],
                role: ['user', Validators.required],
                status: ['', Validators.required],
                school_name: ['', Validators.required],

                image: ['', Validators.nullValidator],
                fileSource: ['', Validators.nullValidator],

            }  ,
            {
              validators: [Validation.match('password', 'password_confirmation')]
            }

        );

    }

    getListeSchool(){
        this.schoolservice.getAllSchool().subscribe({
            next: (list) => {
                this.schools = list
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });
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

    refreshListUser(){
        this.userService.getUsers().subscribe({
            next: (listUser) => {
                this.users = listUser;
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
                this.userService
                    .getFakeUsers()
            },
        });
    }

    onSubmit() {

        this.submitted = true;
        const formData = new FormData();
        formData.append('name',this.form.value.name);
        formData.append('email',this.form.value.email);
        formData.append('fname',this.form.value.fname);
        formData.append('password',this.form.value.password);
        formData.append('password_confirmation',this.form.value.password_confirmation);
        formData.append('role','user');
        formData.append('status',this.form.value.status['value']);

        if(this.UserProfile.role=="super-admin"){
            formData.append('school_id',this.form.value.school_name['id']);
            formData.append('school_name',this.form.value.school_name['Name']);
        }else{
            formData.append('school_id',this.UserProfile.school_id.toString());
            formData.append('school_name',this.UserProfile.school_name);
        }

        if(this.files){
            formData.append('fileSource', this.files,this.files.name);
            formData.append('path',this.files.name);
        }else{
            formData.append('fileSource', '');
            formData.append('path','');
        }

        this.authService.register(formData).subscribe(
            (result) => {
            },
            (error) => {
              this.errors = error.error;
              console.log(this.errors)
            },
            () => {
                this.refreshListUser();
                this.imageSrc=null;
                this.form.reset();
                this.UserDialog = false;
                this.user = {};
                this.toastr.info("Utilisateur ajouter avec succée","Info")
            }
          );
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = {...user};
    }

    confirmDelete(){
        this.deleteUserDialog = false;
        this.userService.deleteUserService(this.user).subscribe(
            data => {
              this.toastr.info("Donnée supprimer avec succèes !", "Suppression");
              this.refreshListUser();
            }
          );
    }

    editUser(user: User) {
        this.user = {...user};
        this.updateUserDialog = true;
    }

    UpdateUser() {
        this.submitted = true;

        if(this.user.status['value']){
            this.user.status=this.user.status['value'];
        }

        const formData = new FormData();
        formData.append('id',this.user.id);
        formData.append('name',this.user.name);
        formData.append('fname',this.user.fname);
        formData.append('status',this.user.status);
        formData.append('role',this.user.role);


        if(this.files != null){
            formData.append('fileSource', this.files,this.files.name);
            formData.append('path',this.files.name);
        }else{
            formData.append('fileSource', '');
            formData.append('path','');
        }

        this.userService.updateUser(formData).subscribe(
            data => {
              this.updateUserDialog = false;
              this.refreshListUser();
              this.imageSrc=null;
              this.files =null;
              this.form.reset();
              this.user = {};
              this.toastr.info("Donnée modifier avec succèes !", "Mise à jour");
            }
        );
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    onReset(): void {
        this.submitted = false;
        this.form.reset();
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.UserDialog = true;
    }

    hideDialog() {
        this.UserDialog = false;
        this.updateUserDialog =false;
        this.submitted = false;
    }

    filterSchool(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.schools.length; i++) {
            const schooll = this.schools[i];
            if (schooll.Name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(schooll);
            }
        }
        this.filteredSchool = filtered;
    }

}
function queryParams(queryParams: any) {
    throw new Error('Function not implemented.');
}

