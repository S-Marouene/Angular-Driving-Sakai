import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { filter, take } from 'rxjs';
import { Condidat } from 'src/app/model/condidat.model';
import { Paiement } from 'src/app/model/paiement.model';
import { PaiementService } from 'src/app/service/paiement/paiement.service';
import { ModalPaiementComponent } from './modal-paiement/modal-paiement.component';

@Component({
  selector: 'app-paiement-condidat',
  templateUrl: './paiement-condidat.component.html'
})
export class PaiementCondidatComponent implements OnInit {
        paiements: Paiement[] = [];
        paiement: Paiement;
        loading: boolean;
        bsModalRef: BsModalRef;
        errors: any = null;
        submitted = false;
        @Input() condidat: Condidat;

        constructor(
            private paiementService: PaiementService,
            private modalService: BsModalService,
            private activatedRoute: ActivatedRoute
        ) {}

        ngOnInit(): void {
            this.activatedRoute.params.subscribe((params) => {
                this.paiementService.getpaiementByCondidat(params.id).subscribe({
                    next: (ListPaiement) => {
                        this.paiements = ListPaiement['data'];
                    },
                    error: () => {
                        console.log(
                            `Problème au niveau du serveur, attention les données sont fake `
                        );
                    },
                });
            });
        }

        openModalpaiement() {

                const initialState = {
                    list: [
                        {
                            operation: 'add',
                            value: 'Ajout',
                            condidat_id: this.condidat.id,
                        },
                    ],
                };
            this.bsModalRef = this.modalService.show(ModalPaiementComponent, {
                initialState
            });
            this.bsModalRef.content.closeBtnName = 'Close';
            this.modalService.onHide
                .pipe(
                    take(1),
                    filter((reason) => reason === 'true')
                )
                .subscribe((reason: string) => {
                    this.getListpaiement();
                });
        }

        getListpaiement() {
            this.activatedRoute.params.subscribe((params) => {
                this.paiementService.getpaiementByCondidat(params.id).subscribe({
                    next: (ListPaiement) => {
                        this.paiements = ListPaiement['data'];
                    },
                    error: () => {
                        console.log(
                            `Problème au niveau du serveur, attention les données sont fake `
                        );
                    },
                });
            })
        }
    }
