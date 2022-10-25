import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';


import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


import { StyleClassModule } from 'primeng/styleclass';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { BlockViewer } from './components/blockviewer/blockviewer.component';

import { AppCodeModule } from './components/app-code/app.code.component';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigComponent } from './app.config.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list_ecole/list_ecole.component';
import { TreeComponent } from './components/tree/tree.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MenusComponent } from './components/menus/menus.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { CrudComponent } from './components/crud/crud.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { PaymentComponent} from './components/menus/payment.component';
import { ConfirmationComponent } from './components/menus/confirmation.component';
import { PersonalComponent } from './components/menus/personal.component';
import { SeatComponent } from './components/menus/seat.component';
import { LandingComponent } from './components/landing/landing.component';

import { CountryService } from './service/countryservice';
import { CustomerService } from './service/customerservice';
import { EventService } from './service/eventservice';
import { IconService } from './service/iconservice';
import { NodeService } from './service/nodeservice';
import { PhotoService } from './service/photoservice';
import { ProductService } from './service/productservice';
import { MenuService } from './service/app.menu.service';
import { ConfigService } from './service/app.config.service';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { TestComponentComponent } from './components/calendrier/test-component.component';
import { AuthInterceptor } from './shared-auth/auth.interceptor';
import { UsersComponent } from './components/users/users.component';
import { UserService } from './service/users.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DefaultProfileUserPipe } from './pipe/default-profile-user.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CondidatComponent } from './components/condidat/condidat.component';
import { ListCondidatComponent } from './components/condidat/list_condidat/list-condidat/list-condidat.component';
import { ItemCondidatComponent } from './components/condidat/item_condidat/item-condidat/item-condidat.component';
import { DetailsCondidatComponent } from './components/condidat/details-condidat/details-condidat.component';
import { CardCondidatComponent } from './components/condidat/details-condidat/card-condidat/card-condidat/card-condidat.component';
import { ExamcondidatComponent } from './components/condidat/details-condidat/exam-condidat/examcondidat/examcondidat.component';
import { RenseingementCondidatComponent } from './components/condidat/details-condidat/renseignement-condidat/renseingement-condidat/renseingement-condidat.component';
import { PaiementCondidatComponent } from './components/condidat/details-condidat/paiement-condidat/paiement-condidat/paiement-condidat.component';
import { ConduiteCondidatComponent } from './components/condidat/details-condidat/conduite-condidat/conduite-condidat/conduite-condidat.component';
import { CodeCondidatComponent } from './components/condidat/details-condidat/code-condidat/code-condidat/code-condidat.component';
import { ParametreComponent } from './components/parametre/parametre.component';
import { VehiculeComponent } from './components/parametre/vehicule/vehicule.component';
import { BureauxComponent } from './components/parametre/bureaux/bureaux.component';
import { CaisseComponent } from './components/parametre/caisse/caisse.component';
import { SecritaireComponent } from './components/parametre/secritaire/secritaire.component';
import { GerantComponent } from './components/parametre/gerant/gerant.component';
import { MoniteurComponent } from './components/parametre/moniteur/moniteur.component';
import { ExaminateurComponent } from './components/parametre/examinateur/examinateur.component';
import { CentreExamenComponent } from './components/parametre/centre-examen/centre-examen.component';
import { ReceveursComponent } from './components/parametre/receveurs/receveurs.component';
import { ItemVehiculeComponent } from './components/parametre/vehicule/item-vehicule/item-vehicule.component';
import { ListVehiculeComponent } from './components/parametre/vehicule/list-vehicule/list-vehicule.component';
import { ItemBureauComponent } from './components/parametre/bureaux/item-bureau/item-bureau.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { ModalVehComponent } from './components/parametre/vehicule/modal_veh/modal-veh/modal-veh.component';
import { ModelBureauComponent } from './components/parametre/bureaux/model-bureau/model-bureau/model-bureau.component';
import { ModelMoniteurComponent } from './components/parametre/moniteur/modal-moniteur/modal-moniteur.component';
import { ItemMoniteurComponent } from './components/parametre/moniteur/item-moniteur/item-moniteur.component';
import { ItemCaisseComponent } from './components/parametre/caisse/item-caisse/item-caisse.component';
import { ModalCaisseComponent } from './components/parametre/caisse/modal-caisse/modal-caisse.component';
import { ModalExaminateurComponent } from './components/parametre/examinateur/modal-examinateur/modal-examinateur.component';
import { ItemExaminateurComponent } from './components/parametre/examinateur/item-examinateur/item-examinateur.component';
import { ItemCentreExamenComponent } from './components/parametre/centre-examen/item-centre-examen/item-centre-examen.component';
import { ModalCentreExamenComponent } from './components/parametre/centre-examen/modal-centre-examen/modal-centre-examen.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
    imports: [
        FullCalendarModule, // register FullCalendar with you app
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        ChipModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        ImageModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TagModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeSelectModule,
        TreeTableModule,
        VirtualScrollerModule,
        AppCodeModule,
        StyleClassModule,
        ReactiveFormsModule,
        NgxPermissionsModule.forRoot(),
        ToastrModule.forRoot(),
        ModalModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        DashboardComponent,
        FormLayoutComponent,
        ProfileComponent,
        InvalidStateComponent,
        InputComponent,
        ButtonComponent,
        TableComponent,
        ListComponent,
        TreeComponent,
        PanelsComponent,
        OverlaysComponent,
        MenusComponent,
        MessagesComponent,
        MessagesComponent,
        MiscComponent,
        ChartsComponent,
        EmptyComponent,
        FileComponent,
        IconsComponent,
        DocumentationComponent,
        CrudComponent,
        TimelineComponent,
        BlocksComponent,
        BlockViewer,
        MediaComponent,
        PaymentComponent,
        ConfirmationComponent,
        PersonalComponent,
        SeatComponent,
        LandingComponent,
        LoginComponent,
        ErrorComponent,
        NotfoundComponent,
        AccessComponent,
        TestComponentComponent,
        UsersComponent,
        DefaultProfileUserPipe,
        CondidatComponent,
        ListCondidatComponent,
        ItemCondidatComponent,
        DetailsCondidatComponent,
        CardCondidatComponent,
        ExamcondidatComponent,
        RenseingementCondidatComponent,
        PaiementCondidatComponent,
        ConduiteCondidatComponent,
        CodeCondidatComponent,
        ParametreComponent,
        VehiculeComponent,
        BureauxComponent,
        CaisseComponent,
        SecritaireComponent,
        GerantComponent,
        MoniteurComponent,
        ExaminateurComponent,
        CentreExamenComponent,
        ReceveursComponent,
        ItemVehiculeComponent,
        ListVehiculeComponent,
        ItemBureauComponent,
        ModalVehComponent,
        ModelBureauComponent,
        ModelMoniteurComponent,
        ItemMoniteurComponent,
        ItemCaisseComponent,
        ModalCaisseComponent,
        ModalExaminateurComponent,
        ItemExaminateurComponent,
        ItemCentreExamenComponent,
        ModalCentreExamenComponent,

    ],
    providers: [
        
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MenuService, ConfigService,UserService,DatePipe,BsModalService,
        {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi: true},
    ],
    bootstrap: [AppComponent],
    entryComponents: [ModalVehComponent],

})
export class AppModule { }
