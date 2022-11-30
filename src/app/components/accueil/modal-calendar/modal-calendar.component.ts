import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EventClickArg } from '@fullcalendar/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Condidat } from 'src/app/model/condidat.model';
import { Conduite } from 'src/app/model/conduite.model';
import { Moniteur } from 'src/app/model/moniteur.model';
import { Vehicule } from 'src/app/model/vehicule.model';
import { CondidatService } from 'src/app/service/condidat/condidat.service';
import { ConduiteService } from 'src/app/service/conduite/conduite.service';
import { MoniteurService } from 'src/app/service/moniteur/moniteur.service';
import { VehiculeService } from 'src/app/service/vehicule/vehicule.service';
import { CONSTANTES } from 'src/environments/environment';
import { ModalPaiementCaldrComponent } from '../modal-paiement/modal-paiement.component';
import { ModalResulCaldrComponent } from '../modal-resul-caldr/modal-resul-caldr.component';
@Component({
    selector: 'app-modal-calendar',
    templateUrl: './modal-calendar.component.html',
})
export class ModalCalendarComponent implements OnInit {
    list: any[] = [];
    submitted: boolean = false;
    formaddexamen;
    moniteurs: Moniteur[] = [];
    vehicules: Vehicule[] = [];
    conduite: Conduite;
    filteredCondidat: any[];
    condidats: Condidat[];
    date1: Date;
    nbr_heure: any;
    heurs: any = ['1', '2', '3', '4'];
    errors;
    URLcondidatPic = CONSTANTES.URLcondidatPic;

    constructor(
        public bsModalRef: BsModalRef,
        private modalService: BsModalService,
        public fb: FormBuilder,
        public datepipe: DatePipe,
        private moniteurService: MoniteurService,
        private vehiculeService: VehiculeService,
        private condidatservice: CondidatService,
        private conduiteService: ConduiteService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.moniteurService.getMoniteurs().subscribe({
            next: (ListMoniteur) => {
                this.moniteurs = ListMoniteur['data'];
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });

        this.vehiculeService.getVehicules().subscribe({
            next: (ListVehicule) => {
                this.vehicules = ListVehicule['data'];
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });

        this.formaddexamen = this.fb.group({
            date_deb: ['', [Validators.required]],
            date_fin: ['', [Validators.required]],
            moniteur: ['', [Validators.required]],
            vehicule: ['', [Validators.required]],
            condidat: ['', [Validators.required]],
            nbr_heure: ['', [Validators.required]],
            couleur: ['', [Validators.required]],
        });

        this.date1 = new Date(this.list[0].start);
        this.date1.setHours(
            this.date1.getHours() + Number(this.list[0].nbr_heure) || 2
        );

        this.formaddexamen.setValue({
            date_deb:
                this.datepipe.transform(
                    this.list[0].start,
                    'yyyy-MM-dd H:mm'
                ) || '',
            date_fin:
                this.datepipe.transform(this.date1, 'yyyy-MM-dd H:mm') || '',
            moniteur: this.list[0].moniteur || '',
            vehicule:
                this.list[0].vehicule + ' : ' + this.list[0].couleur || '',
            condidat: this.list[0].condidat || '',
            nbr_heure: this.list[0].nbr_heure || 2,
            couleur: this.list[0].couleur || '',
        });
    }

    hideDialog() {
        this.bsModalRef.hide();
        this.submitted = false;
    }

    get f(): { [key: string]: AbstractControl } {
        return this.formaddexamen.controls;
    }

    ChargeColorEvent(color: string) {
        switch (color) {
            case 'Rouge':
                return 'rgb(193 61 61)';
                break;
            case 'Bleu':
                return '#4244cc';
                break;
            case 'Vert':
                return '#26a771';
                break;
            case 'Jaune':
                return 'rgb(175 186 31)';
                break;
            case 'Noir':
                return '#212121';
                break;
            case 'Blanc':
                return '#E0E0E0';
                break;

            default:
                return '#888afa';

                break;
        }
    }

    ShowPaiementModal() {
        const initialState = {
            list: [
                {
                    operation: 'Paiement',
                    condidat_id:this.list[0].extendedProps.condidat_id
                },
            ],
        };
        this.bsModalRef.hide();
        this.bsModalRef = this.modalService.show(ModalPaiementCaldrComponent, {
            initialState,class: 'modal-lg'
        });
        this.bsModalRef.content.closeBtnName = 'Close';
    }

    ShowResultModal(){
        const initialState = {
            list: [
                {
                    operation: 'Liste examen',
                    condidat_id:this.list[0].extendedProps.condidat_id
                },
            ],
        };
        this.bsModalRef.hide();
        this.bsModalRef = this.modalService.show(ModalResulCaldrComponent, {
            initialState,class: 'modal-lg'
        });
        this.bsModalRef.content.closeBtnName = 'Close';

    }
}
