import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';
import { Condidat } from 'src/app/model/condidat.model';
import { Paiement } from 'src/app/model/paiement.model';
import { PaiementService } from 'src/app/service/paiement/paiement.service';
import { ModalPaiementComponent } from '../modal-paiement/modal-paiement.component';
import {DialogModule, Dialog} from 'primeng/dialog'



@Component({
  selector: 'tr[app-item-paiement]',
  templateUrl: './item-paiement.component.html'
})
export class ItemPaiementComponent implements OnInit {



        @Input() paiement: Paiement | null = null;
        @Output() refresh_list_evnt = new EventEmitter<any>();
        @Input() condidat: Condidat;

        editForm: FormGroup;
        deletePaiementDialog: boolean = false;
        updatevehDialog: boolean;
        submitted: boolean = false;
        id: any;
        titleModal: any;
        bsModalRef: BsModalRef;

        constructor(
            private paiementService: PaiementService,
            private toastr: ToastrService,
            public fb: FormBuilder,
            private modalService: BsModalService
        ) {}

        ngOnInit(): void {}

        deletepaiement(paiement: Paiement) {
            this.deletePaiementDialog = true;
            this.paiement = {...paiement};
            console.log(this.paiement);

        }

        confirmDelete() {
            this.deletePaiementDialog = false;
            this.paiementService.destroy(this.paiement).subscribe((data) => {
                this.toastr.info('Donnée supprimer avec succèes !', 'Suppression');
                this.refresh_list_evnt.emit();
            });
        }

        openModalExam() {
            const initialState = {
                list: [
                    {
                        operation: 'update',
                        value: 'Modification',
                        paiement: this.paiement,
                        condidat_id:this.condidat.id
                    },
                ],
            };
            this.bsModalRef = this.modalService.show(ModalPaiementComponent, {
                initialState,
            });
            this.bsModalRef.content.closeBtnName = 'Close';

            this.modalService.onHide
                .pipe(
                    take(1),
                    filter((reason) => reason === 'true')
                )
                .subscribe((reason: string) => {
                    this.refresh_list_evnt.emit();
                });
        }

        get f(): { [key: string]: AbstractControl } {
            return this.editForm.controls;
        }

        OpenModalResult(){
            const initialState = {
                list: [
                    {
                        operation: 'update',
                        value: 'Résultat',
                        paiement: this.paiement,
                        condidat_id:this.condidat.id
                    },
                ],
            };
            this.bsModalRef = this.modalService.show(ModalPaiementComponent, {
                initialState, class: 'modal-lg'
            });
            this.bsModalRef.content.closeBtnName = 'Close';

            this.modalService.onHide
                .pipe(
                    take(1),
                    filter((reason) => reason === 'true')
                )
                .subscribe((reason: string) => {
                    this.refresh_list_evnt.emit();
                });
        }

    }
