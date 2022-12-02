import { Component, OnInit,Input} from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthStateService } from './shared-auth/auth-state.service';
import { TokenService } from './shared-auth/token.service';
import { AuthService} from './shared-auth/auth.service';
import { User } from './model/users.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CONSTANTES } from 'src/environments/environment';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit  {

    items: MenuItem[];
    tieredItems: MenuItem[];
    PasswordDialog: boolean;
    submitted:boolean;
    formChngPWD: FormGroup = new FormGroup({});
    /* UserProfile!: User; */
    URLcondidatPic=CONSTANTES.URLprofilePic;
    constructor(public appMain: AppMainComponent,
        private auth: AuthStateService,
        public router: Router,
        public token: TokenService,
        public authService: AuthService,
        public fb: FormBuilder,
        private toastr: ToastrService,
    ) { }

    @Input() UserProfile!:User;


    ngOnInit() {
        this.tieredItems = [
            {
                label: 'Customers',
                icon: 'pi pi-fw pi-table',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Customer',
                                icon: 'pi pi-fw pi-plus'
                            },
                            {
                                label: 'Duplicate',
                                icon: 'pi pi-fw pi-copy'
                            },

                        ]
                    },
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-cog'
                    },
                    {
                        label: 'Billing',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            },
            { separator: true },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-sign-out'
            }
        ];

        this.formChngPWD = this.fb.group(
            {
                old_password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                    ],
                ],
                new_password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                    ],
                ],
                confirm_password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                    ],
                ],

            }


        );
    }

    signOut() {
        this.auth.setAuthState(false);
        localStorage.clear();
        this.router.navigate(['pages/login']);
    }

    show_ch_pass(){
        this.PasswordDialog=true;
        this.submitted = false;
    }

    hideDialog(){
        this.PasswordDialog = false;
        this.submitted = false;
    }

    ChangePSW(){
        this.submitted = true;
        this.authService.changepsw(this.formChngPWD.value).subscribe(
            (data) => {
                if (data['status']==400) {
                    this.toastr.error(data['message'],"Info");
                    this.PasswordDialog = true;
                } else {
                    this.toastr.info("Mot de passe Modifier avec succée","Changement mot de passe");
                    this.PasswordDialog = false;
                    this.signOut();
                }
            },
            (err) => {
              this.toastr.error(err.message,"Error")
              console.log(err.message)
            }
        );
    }

    get f(): { [key: string]: AbstractControl } {
        return this.formChngPWD.controls;
    }

}
