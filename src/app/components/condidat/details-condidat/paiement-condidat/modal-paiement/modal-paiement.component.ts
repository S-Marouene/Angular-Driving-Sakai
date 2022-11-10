import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Caisse } from 'src/app/model/caisse.model';
import { Paiement } from 'src/app/model/paiement.model';
import { CaisseService } from 'src/app/service/caisse/caisse.service';
import { CentreExamService } from 'src/app/service/centre-exam/centre-exam.service';
import { PaiementService } from 'src/app/service/paiement/paiement.service';

@Component({
  selector: 'app-modal-paiement',
  templateUrl: './modal-paiement.component.html'
})
export class ModalPaiementComponent implements OnInit {


        formaddpaiement;
        submitted: boolean = false;
        errors: any;
        paiement: Paiement;
        titleModal: any;
        list: any[] = [];
        paiements: Paiement[] = [];
        caisses: Caisse[] = [];
        public centre_paiements: any = [];
        public caissex:any = [];
        type_paiementRadio:boolean=false;
        public pieces: any = [
            'Droit Paiement Conduite',
            'Réinscription Conduite'
        ];
        prestation_modif:any;

        constructor(
            public fb: FormBuilder,
            private paiementService: PaiementService,
            public router: Router,
            private toastr: ToastrService,
            public bsModalRef: BsModalRef,
            private modalService: BsModalService,
            private centreExamService:CentreExamService,
            public datepipe: DatePipe,
            private caisseService:CaisseService,
        ) {}

        ngOnInit(): void {
            this.caisseService.getCaisses().subscribe({
                next: (ListCaisse) => {
                    this.caisses = ListCaisse['data'];
                    console.log(this.caisses);
                },
                error: () => {
                    console.log(
                        `Problème au niveau du serveur, attention les données sont fake `
                    );
                },
            });

            this.formaddpaiement = this.fb.group({
                mode_paiement: ['', Validators.required],
                caisse: ['', [Validators.required]],
                montant: ['', [Validators.required]],
                condidat_id: ['', [Validators.required]],
                type: ['', [Validators.required]],
            });

            this.formaddpaiement.setValue({
                mode_paiement: this.list[0].paiement?.mode_paiement || '',
                caisse: this.list[0].paiement?.caisse || '',
                montant: this.list[0].paiement?.montant || '',
                condidat_id:this.list[0].condidat_id,
                type: this.list[0].paiement?.type || '',
            });

        }

        get f(): { [key: string]: AbstractControl } {
            return this.formaddpaiement.controls;
        }

        onSubmit() {
            this.submitted = true;
           console.log(this.formaddpaiement.value);

            this.paiementService.register(this.formaddpaiement.value).subscribe(
                (result) => {},
                (error) => {
                    this.errors = error.error;
                },
                () => {
                    this.formaddpaiement.reset();
                    this.bsModalRef.hide();
                    this.paiement = {};
                    this.toastr.info('paiement ajouter avec succée', 'Info');
                    this.modalService.setDismissReason('true');
                }
            );
        }

        onUpdate(id: any) {
            this.submitted = true;

            this.formaddpaiement.value.date_paiement=this.datepipe.transform(
                this.formaddpaiement.value.date_paiement,
                'yyyy-MM-dd H:mm'
            )
            if (this.formaddpaiement.value.type_paiement == true) {
                this.formaddpaiement.value.type_paiement = 'Conduite';
                this.formaddpaiement.value.prestation=''
                this.formaddpaiement.value.prestation = this.formaddpaiement.value.prestation?.toString() || this.formaddpaiement.value.prestation_cond.toString()

            } else {
                this.formaddpaiement.value.type_paiement = 'Code';
                this.formaddpaiement.value.prestation_cond=''
                this.formaddpaiement.value.prestation =  this.formaddpaiement.value.prestation?.toString() || this.formaddpaiement.value.prestation_cond.toString()

            }

            if (this.formaddpaiement.valid) {
                this.paiementService
                    .update_paiement(this.formaddpaiement.value, id)
                    .subscribe(
                        (result) => {},
                        (error) => {
                            this.errors = error.error;
                            console.log(this.errors);

                        },
                        () => {
                            this.formaddpaiement.reset();
                            this.bsModalRef.hide();
                            this.paiement = {};
                            this.toastr.info('Donnée Modifier avec succée', 'Info');
                            this.modalService.setDismissReason('true');
                            this.submitted = false;
                        }
                    );
            }
        }

        hideDialog() {
            this.bsModalRef.hide();
            this.submitted = false;
        }
    }
