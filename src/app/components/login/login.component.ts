import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared-auth/auth.service';
import { TokenService } from 'src/app/shared-auth/token.service';
import { AuthStateService } from 'src/app/shared-auth/auth-state.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { diffDates } from '@fullcalendar/angular';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password: string;

  config: AppConfig;

  subscription: Subscription;

  loginForm: FormGroup;
  errors:any = null;

  constructor(public configService: ConfigService,
    private  messageService: MessageService,
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService){ {
        this.loginForm = this.fb.group({
          email: [],
          password: [],
        });
      }}
    user:any;


  onSubmit() {
    const form=this.loginForm.value ;

      this.authService.signin(this.loginForm.value).subscribe(
        (result) => {
            if (result.user['status'] == 'active') {
                this.responseHandler(result);
            }else{
                this.messageService.add({severity:'info', summary: 'Record is added successully', detail:'record added'});
            }
        },
        (error) => {
          this.errors = error.error;
        },
        () => {
          this.authState.setAuthState(true);
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        }
      );
  }

  ngOnInit(): void {
    if(this.authState.userState.value==true){
        this.router.navigate(['dashboard']);
    }else{
        this.router.navigate(['']);
    }

    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  responseHandler(data:any) {
    this.token.handleData(data.access_token);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  Signin(){
      this.router.navigate(['dashboard']);
  }

}
