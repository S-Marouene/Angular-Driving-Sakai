import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { AuthStateService } from './shared-auth/auth-state.service';
import { Router } from '@angular/router';
import { TokenService } from './shared-auth/token.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    menuMode = 'static';
    isSignedIn!: boolean;

    constructor(
        private primengConfig: PrimeNGConfig,
        private auth: AuthStateService,
        public router: Router,
        public token: TokenService
    ) { }

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth'
      };

    ngOnInit() {
        this.auth.userAuthState.subscribe((val) => {
            this.isSignedIn = val;

        });

        console.log(this.isSignedIn);
        
          this.primengConfig.ripple = true;
        document.documentElement.style.fontSize = '14px';
    }
}
