import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/shared-auth/auth.service';
import { TokenService } from 'src/app/shared-auth/token.service';
import { AuthStateService } from 'src/app/shared-auth/auth-state.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { diffDates } from '@fullcalendar/angular';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }

            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
            .custom-button {
                padding: 10px 20px;
                font-size: 16px;
                /* background-color: #cc397b; */
                color: #fff;
                border: none;
                cursor: pointer;
                width:100%;
            }
        `,
    ],
})
export class LoginComponent implements OnInit, OnDestroy {
    valCheck: string[] = ['remember'];

    password: string;
    submitted:boolean=false;
    config: AppConfig;

    subscription: Subscription;

    loginForm: FormGroup;
    errors: any = null;

    constructor(
        public configService: ConfigService,
        public router: Router,
        public fb: FormBuilder,
        public authService: AuthService,
        private token: TokenService,
        private toastr: ToastrService,
        private authState: AuthStateService
        ) {
            {
                this.loginForm = this.fb.group({
                    email: ['', [Validators.required/* , Validators.email */]],
                    password: ['', [Validators.required, Validators.minLength(6)]],
                });
            }
    }
    user: any;

    onSubmit() {
        const form = this.loginForm.value;
        this.submitted=true;
        this.authService.signin(this.loginForm.value).subscribe(
            (data) => {

                if(data['status']){
                    this.toastr.error(
                        "Vérifier vos donnée !",
                        'Utilisateur ou Mot de passe incorrect'
                    );
                }else if (data.user['status'] == 'active') {
                    this.responseHandler(data);
                    this.authState.setAuthState(true);
                    this.loginForm.reset();
                    /* this.toastr.info(
                        "Bienvenu !"
                    ); */
                    this.router.navigate(['dashboard']);
                } else if (data.user['status'] == 'inactive'){
                    this.toastr.warning(
                        "Contacter L'administrateur !",
                        'Utilisateur Inactive '
                    );
                }
            },
            /* (error) => {
                this.errors = error.mess;
                this.toastr.error(this.errors)
            }, */

        );
    }

    ngOnInit(): void {
        if (this.authState.userState.value === true) {
            this.router.navigate(['dashboard']);
        } else {
            this.router.navigate(['pages/login']);
        }

        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(
            (config) => {
                this.config = config;
            }
        );
    }

    responseHandler(data: any) {
        this.token.handleData(data.access_token);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    Signin() {
        this.router.navigate(['dashboard']);
    }

    get f(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
    }

    getsuper(){
        this.loginForm.get("email").setValue("saidi.marouen@gmail.com");
        this.loginForm.get("password").setValue("aaaaaa");
    }

    getfakesuper(){
        this.loginForm.get("email").setValue("saidi.marouen@gmail.com1");
        this.loginForm.get("password").setValue("aaaaaa");
    }

    downloadApk() {
        const apkPath = 'assets/apk/app-release.apk';
        const link = document.createElement('a');
        link.href = apkPath;
        link.download = 'driving.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

}
