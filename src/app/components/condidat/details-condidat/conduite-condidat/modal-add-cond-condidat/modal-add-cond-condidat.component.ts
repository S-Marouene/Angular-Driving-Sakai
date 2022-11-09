import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-modal-add-cond-condidat',
  templateUrl: './modal-add-cond-condidat.component.html'
})
export class ModalAddCondCondidatComponent implements OnInit {

    list: any[] = [];
    submitted: boolean = false;
    formaddexamen;
    moniteurs: Moniteur[] = [];
    vehicules: Vehicule[] = [];
    conduite:Conduite;
    filteredCondidat: any[];
    condidats: any;
    date1: Date;
    nbr_heure: any;
    heurs: any = ['1', '2', '3', '4'];
    errors;


    constructor(
        public bsModalRef: BsModalRef,
        private modalService: BsModalService,
        public fb: FormBuilder,
        public datepipe: DatePipe,
        private moniteurService: MoniteurService,
        private vehiculeService: VehiculeService,
        private condidatservice: CondidatService,
        private conduiteService:ConduiteService,
        private toastr: ToastrService,
        private activatedRoute:ActivatedRoute,
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

        /* this.activatedRoute.params.subscribe((params) => {
            this.condidatservice.getCondidatsByID(params.id).subscribe({
                next: (ListCondidat) => {
                    this.condidats = ListCondidat.prenom + ' ' + ListCondidat.nom

                    console.log(this.condidats);
                },
                error: () => {
                    console.log(
                        `Problème au niveau du serveur, attention les données sont fake `
                    );
                },
            });
        }) */


        this.formaddexamen = this.fb.group({
            date_deb: ['', [Validators.required]],
            date_fin: ['', [Validators.required]],
            moniteur: ['', [Validators.required]],
            vehicule: ['', [Validators.required]],
            condidat: ['', [Validators.required]],
            nbr_heure: ['', [Validators.required]],
        });

        this.date1 = new Date(this.list[0].start);
        this.date1.setHours(this.date1.getHours() + Number(this.list[0].nbr_heure) || 2);

        this.formaddexamen.setValue({
            date_deb:
                this.datepipe.transform(
                    this.list[0].start,
                    'yyyy-MM-dd H:mm'
                ) || '',
            date_fin:
                this.datepipe.transform(this.date1, 'yyyy-MM-dd H:mm') || '',

            moniteur: this.list[0].moniteur || '',
            vehicule: this.list[0].vehicule || '',
            condidat: this.list[0].condidat || '',
            nbr_heure: this.list[0].nbr_heure || 2,
        });
    }

    onSubmit(id) {
        const date_deb = this.datepipe.transform(this.formaddexamen.get('date_deb').value, 'yyyy-MM-dd HH:mm').toString().replace(' ', 'T')
        const date_fin = this.datepipe.transform(this.formaddexamen.get('date_fin').value, 'yyyy-MM-dd HH:mm').toString().replace(' ', 'T')
        this.submitted = true;
        this.formaddexamen.patchValue({
            condidat:{'id':this.list[0].condidat_id,'nom':this.list[0].condidat_nom,'prenom':this.list[0].condidat_prenom},
        });


        this.conduiteService.register(this.formaddexamen.value).subscribe(
            (data) => {
                this.bsModalRef.hide();
                this.conduite = {};
                this.toastr.info('cour conduite ajouter avec succée', 'Info');
                const calendarApi =  this.list[0].selectInfo.view.calendar;
                calendarApi.unselect(); // clear date selection
                calendarApi.addEvent({
                    start: date_deb,
                    end: date_fin,
                    allDay: false,
                    title: this.formaddexamen.value['condidat']['prenom'] +' '+ this.formaddexamen.value['condidat']['nom'],
                    conduite_moniteur:data['data']['moniteur'],
                    conduite_vehicule:data['data']['vehicule'],
                    nbr_heure:data['data']['nbr_heure'],
                    conduite_id:data['data']['id'],
                })

            },
            (error) => {
                this.errors = error.error;
            },

        );
    }

    onDelete(clickInfo: EventClickArg){
        console.log(clickInfo.event._def.extendedProps['conduite_id']);

        this.conduiteService.destroy(clickInfo.event._def.extendedProps['conduite_id']).subscribe((data) => {
            this.toastr.info('Donnée supprimer avec succèes !', 'Suppression');
            clickInfo.event.remove();
            this.bsModalRef.hide();
        });
    }


    onUpdate(clickInfo: EventClickArg){
        this.submitted = true;
        const date_deb = this.datepipe.transform(this.formaddexamen.get('date_deb').value, 'yyyy-MM-dd HH:mm').toString().replace(' ', 'T')
        const date_fin = this.datepipe.transform(this.formaddexamen.get('date_fin').value, 'yyyy-MM-dd HH:mm').toString().replace(' ', 'T')
        this.formaddexamen.patchValue({
            date_deb: date_deb,
            date_fin:date_fin
          });

        this.conduiteService
            .update_cond(this.formaddexamen.value, clickInfo.event._def.extendedProps['conduite_id'])
            .subscribe(
                (data) => {
                    this.formaddexamen.reset();
                    this.bsModalRef.hide();
                    this.conduite = {};
                    this.toastr.info('Donnée Modifier avec succée', 'Info');
                    clickInfo.event.remove();
                    clickInfo.view.calendar.addEvent({
                        start: date_deb,
                        end: date_fin,
                        allDay: false,
                        title: data['data']['condidat_prenom'] + ' ' + data['data']['condidat_nom'],
                        conduite_moniteur:data['data']['moniteur'],
                        conduite_vehicule:data['data']['vehicule'],
                        nbr_heure:data['data']['nbr_heure'],
                        conduite_id:data['data']['id'],
                    })
                },
                (error) => {
                    this.errors = error.error;
                },

            );
    }

    setDateFin() {
        this.date1 = new Date(this.formaddexamen.value.date_deb);
        this.formaddexamen.patchValue({
            date_fin:
                this.datepipe.transform(
                    this.date1.setHours(
                        this.date1.getHours() +
                        Number(this.formaddexamen.value.nbr_heure)
                    ),
                    'yyyy-MM-dd H:mm'
                ) || '',
        });
    }


    hideDialog() {
        this.bsModalRef.hide();
        this.submitted = false;
    }

    get f(): { [key: string]: AbstractControl } {
        return this.formaddexamen.controls;
    }
}
