import { Component, OnInit } from '@angular/core';
import { Product } from '../../api/product';
import { ProductService } from '../../service/productservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../service/users.service';
import { User } from 'src/app/model/users';
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

@Component({
    templateUrl: './users.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss'],
})
export class UsersComponent implements OnInit {
    errors: any = null;

    UserDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];

    product: Product;

    user: User;

    selectedProducts: Product[];

    cols: any[];
    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];
    users: User[] = [];

    submitted = false;

    form: FormGroup = new FormGroup({
        name: new FormControl(''),
        firstname: new FormControl(''),
        email: new FormControl('')
    });

    constructor(
        private userservice: UserService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private userService: UserService,
        public authService: AuthService,
        public fb: FormBuilder,
        public router: Router
    ) {}

    ngOnInit() {
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
                    .then((data) => (this.products = data));
            },
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' },
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' },
        ];

        this.form = this.fb.group(
            {
                name: ['', Validators.required],
                firstname: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(20),
                    ],
                ],
                email: ['', [Validators.required, Validators.email]],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(40),
                    ],
                ],
                password_confirmation: ['', Validators.required],
                role: ['VISITEUR', Validators.required]
            }  ,
            {
              validators: [Validation.match('password', 'password_confirmation')]
            }
        );
    }


    onSubmit() {

        this.submitted = true;

        if (this.form.invalid) {
            return;
        }


        this.authService.register(this.form.value).subscribe(
            (result) => {
              console.log(result);
            },
            (error) => {
              this.errors = error.error;
              this.messageService.add({severity: 'error', summary: 'danger', detail: 'The form is not valid, please check the fields' , life: 3000});
            },
            () => {

              this.users.push(this.form.value);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Users Created', life: 3000});
              this.users = [...this.users];
              this.UserDialog = false;
              this.user = {};

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
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        console.log(this.user);
    }








}
