import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthStateService } from './shared-auth/auth-state.service';
import { TokenService } from './shared-auth/token.service';
import { AuthService} from './shared-auth/auth.service';
import { User } from './model/users.model';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit  {

    items: MenuItem[];
    tieredItems: MenuItem[];
    UserProfile!: User;

    constructor(public appMain: AppMainComponent,
        private auth: AuthStateService,
        public router: Router,
        public token: TokenService,
        public authService: AuthService
    ) { }
    ngOnInit() {

        this.authService.profileUser().subscribe((data: any) => {
            this.UserProfile = data;
        });

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

    }

    signOut() {
        this.auth.setAuthState(false);
        localStorage.clear();
        this.router.navigate(['pages/login']);
    }


}
