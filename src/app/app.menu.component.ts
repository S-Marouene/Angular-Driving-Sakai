import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs';
import { AppMainComponent } from './app.main.component';
import { AuthService } from './shared-auth/auth.service';
import { TokenService } from './shared-auth/token.service';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none" >

                        </li>
                    </ul>
                </li>
                <!--a href="https://www.primefaces.org/primeblocks-ng/#/">
                    <img src="assets/layout/images/{{appMain.config.dark ? 'banner-primeblocks-dark' : 'banner-primeblocks'}}.png" alt="Prime Blocks" class="w-full mt-3"/>
                </a-->
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {
    model: any[];
    displaySuperAdmin=false;
    displayAdmin=false;
    displayUser=false;
    currentrole: any;
    ListPermission: Array<string> = [];

    constructor(public appMain: AppMainComponent,
        public authService: AuthService,
        public tokenService:TokenService) { }

    ngOnInit() {

        if (this.authService.GetToken() != '') {
            this.authService.GetMenubyrole().subscribe(result => {
                for (let index = 0; index < result['AllPermission'].length; index++) {
                    this.ListPermission.push(result['AllPermission'][index].name);
                }
                this.GenerateMenu();
            });
        }
    }

    Check_Menu(list:Array<string>,menu_name:string):boolean{
        if (list.indexOf(menu_name) > -1) {
            return true;
        }
        return false;
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }

    GenerateMenu(){
        this.model = [
            {
                label: 'Accueil',
                items:[
                    {label: 'Tableau de bord',icon: 'pi pi-fw pi-home', routerLink: ['dashboard']}
                ]
            },
            {
                label: 'Auto-Ecole',
                items: [
                    /* {label: 'Mon profil', icon: 'pi pi-fw pi-user-edit', routerLink: ['/uikit/profile']}, */
                    {label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/calendar'],visible :this.Check_Menu(this.ListPermission,'calendrier')},
                    {label: 'Utilisateur', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/listusers'],visible : this.Check_Menu(this.ListPermission,'user')},
                    {label: 'Liste des écoles', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'],visible : this.Check_Menu(this.ListPermission,'liste_ecole')},
                    {label: 'Condidat', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/condidat'],visible : this.Check_Menu(this.ListPermission,'condidat')},

                ]
            },
            {
                label:'Autres ...................',
                items:[
                    {label: 'Code', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
                    {label: 'Conduite', icon: 'pi pi-fw pi-bookmark', routerLink: ['/pages/crud']},
                    {label: 'Recherche', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate']},
                    {label: 'Archive', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
                    {label: 'Caisse', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},

                    {label: 'Parametre', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
                    {label: 'Calendrier Examen', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
                    {label: 'test Crud', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/testcrud'],visible :this.Check_Menu(this.ListPermission,'test_crud')},
                    {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
                    {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
                    {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true},
                    {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
                    {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
                    {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
                    {label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc']},
                   /*  {label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW'}, */
                    /* {label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank'}, */
                ]
            },
            {label:'Utilities',
                items:[
                    {label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/icons']},
                   /*  {label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank'}, */
                ]
            },
            {
                label: 'Pages',
                items: [

                    {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline']},
                    /* {label: 'Landing', icon: 'pi pi-fw pi-globe', routerLink: ['pages/landing']}, */
                    {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['pages/login']},
                    {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['pages/error']},
                    {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['pages/notfound']},
                    {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['pages/access']},
                    {label: 'Empty', icon: 'pi pi-fw pi-circle', routerLink: ['/pages/empty']}
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                        ]
                    }
                ]
            }
        ];
    }

}
