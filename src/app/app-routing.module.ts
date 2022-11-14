import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list_ecole/list_ecole.component';
import { TreeComponent } from './components/tree/tree.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { TestComponentComponent } from './components/calendrier/test-component.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './shared-auth/guard/auth.guard';
import { UserGuard } from './shared-auth/guard/user.guard';
import { CondidatComponent } from './components/condidat/condidat.component';
import { DetailsCondidatComponent } from './components/condidat/details-condidat/details-condidat.component';
import { ParametreComponent } from './components/parametre/parametre.component';
import { CodeComponent } from './components/code/code.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {path:'', component: LoginComponent},
            {
                path: '', component: AppMainComponent,
                children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
                    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
                    {path: 'testcrud', component:  CrudComponent, canActivate: [UserGuard]},
                    {path: 'listusers', component:  UsersComponent ,canActivate: [AuthGuard] },
                    {path: 'condidat', component:  CondidatComponent ,canActivate: [AuthGuard] },
                    {path: 'condidat/:id', component:  DetailsCondidatComponent },
                    {path: 'listSchool', component: ListComponent},
                    {path: 'parametre', component: ParametreComponent},
                    {path: 'code', component: CodeComponent},

                    {path: 'calendar', component: TestComponentComponent,canActivate: [AuthGuard] },
                    {path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },



                    /***Autresss for testing */
                    {path: 'uikit/input', component: InputComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateComponent},
                    {path: 'uikit/button', component: ButtonComponent},
                    {path: 'uikit/table', component: TableComponent},
                    {path: 'uikit/tree', component: TreeComponent},
                    {path: 'uikit/panel', component: PanelsComponent},
                    {path: 'uikit/overlay', component: OverlaysComponent},
                    {path: 'uikit/media', component: MediaComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/message', component: MessagesComponent},
                    {path: 'uikit/misc', component: MiscComponent},
                    {path: 'uikit/charts', component: ChartsComponent},
                    {path: 'uikit/file', component: FileComponent},
                    {path: 'pages/crud', component:FormLayoutComponent},
                    {path: 'pages/timeline', component: TimelineComponent},
                    {path: 'pages/empty', component: EmptyComponent},
                    {path: 'icons', component: IconsComponent},
                    {path: 'blocks', component: BlocksComponent},
                    {path: 'documentation', component: DocumentationComponent}
                ],
            },
            {path:'pages/landing', component: LandingComponent},
            {path:'pages/login', component: LoginComponent},
            {path:'pages/error', component: ErrorComponent},
            {path:'pages/notfound', component: NotfoundComponent},
            {path:'pages/access', component: AccessComponent},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
