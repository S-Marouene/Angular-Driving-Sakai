import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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

    constructor(
        private userservice: UserService,
        private messageService: MessageService,
        private userService: UserService,
        public authService: AuthService,
        public fb: FormBuilder,
        public router: Router
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
            { field: 'image', header: 'image' },
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

    testmessage(){
        console.log("testt");
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
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
        //this.form.value.status=this.form.value.status['value'];


        formData.append('name',this.form.value.name);
        formData.append('email',this.form.value.email);
        formData.append('fname',this.form.value.fname);
        formData.append('password',this.form.value.password);
        formData.append('password_confirmation',this.form.value.password_confirmation);

        formData.append('role',this.form.value.role);
        formData.append('status',this.form.value.status['value']);
        console.log(formData);

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
              //this.messageService.add({severity: 'error', summary: 'danger', detail: 'The form is not valid, please check the fields' , life: 3000});
            },
            () => {
                this.refreshListUser();
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
        this.user.status=this.user.status['value'];

        this.userService.updateUser(this.user).subscribe(
            data => {
              this.updateUserDialog = false;
              this.refreshListUser();
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
