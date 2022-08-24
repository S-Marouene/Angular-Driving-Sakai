import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { UserService } from '../../service/users.service';
import { User } from 'src/app/model/users.model';
import { AuthService } from 'src/app/shared-auth/auth.service';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/utils/validation';
import { CONSTANTES } from 'src/app/constantes/constantes';
import { diffDates } from '@fullcalendar/angular';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './users.component.html',
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

    form: FormGroup = new FormGroup({});
    imageSrc: string = '';
    files:any;

    URLprofilePic=CONSTANTES.URLprofilePic;

    private roles: any = ['super-admin', 'admin', 'user'];

    constructor(
        private userservice: UserService,
        private messageService: MessageService,
        private userService: UserService,
        public authService: AuthService,
        public fb: FormBuilder,
        public router: Router,
        private toastr: ToastrService,
    ) {}



    ngOnInit() {
        this.refreshListUser();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'status', header: 'Status' },
            { field: 'file', header: 'File' },
            { field: 'image', header: 'image' }

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

                image: ['', Validators.nullValidator],
                fileSource: ['', Validators.nullValidator],

            }  ,
            {
              validators: [Validation.match('password', 'password_confirmation')]
            }
        );
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

                this.userservice
                    .getFakeUsers()
                    //.then((data) => (this.users = data));
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
        formData.append('role',this.form.value.role);
        formData.append('status',this.form.value.status['value']);

        if(this.files){
            formData.append('fileSource', this.files,this.files.name);
            formData.append('path',this.files.name);
        }else{
            formData.append('fileSource', '');
            formData.append('path','');
        }

        this.authService.register(formData).subscribe(
            (result) => {
              console.log(result);
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
              console.log("deleted");
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




}
