import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';
import { Condidat } from 'src/app/model/condidat.model';
import { Examen } from 'src/app/model/examen.model';
import { ExamenService } from 'src/app/service/examen/examen.service';
import { ModalExamComponent } from '../modal/modal-exam/modal-exam.component';
import { ModalResultatComponent } from '../modal/modal-resultat/modal-resultat.component';

@Component({
  selector: 'tr[app-item-examen]',
  templateUrl: './item-examen.component.html',
  styleUrls: ['./item-style.scss'],
})
export class ItemExamenComponent implements OnInit {
        @Input() examen: Examen | null = null;
        @Output() refresh_list_evnt = new EventEmitter<any>();
        @Input() condidat: Condidat;

        editForm: FormGroup;
        deleteExamenDialog: boolean = false;
        updatevehDialog: boolean;
        submitted: boolean = false;
        @Input() id: string | null = null;
        //id: any;
        titleModal: any;
        bsModalRef: BsModalRef;

        constructor(
            private examenService: ExamenService,
            private toastr: ToastrService,
            public fb: FormBuilder,
            private modalService: BsModalService
        ) {}

        ngOnInit(): void {}

        deleteexamen(examen: Examen) {
            this.deleteExamenDialog = true;
            this.examen = {...examen};
        }

        confirmDelete() {
            this.deleteExamenDialog = false;
            this.examenService.destroy(this.examen).subscribe((data) => {
                this.toastr.info('Donnée supprimer avec succèes !', 'Suppression');
                this.refresh_list_evnt.emit();
            });
        }

        openModalExam(id) {
            if(id){
                id=id
            }
            else{
                id=this.condidat.id;
            }

            const initialState = {
                list: [
                    {
                        operation: 'update',
                        value: 'Modification',
                        examen: this.examen,
                        condidat_id:id
                    },
                ],
            };
            this.bsModalRef = this.modalService.show(ModalExamComponent, {
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

        OpenModalResult(id){
            if(id){
                id=id
            }
            else{
                id=this.condidat.id;
            }
            const initialState = {
                list: [
                    {
                        operation: 'update',
                        value: 'Résultat',
                        examen: this.examen,
                        condidat_id:id
                    },
                ],
            };
            this.bsModalRef = this.modalService.show(ModalResultatComponent, {
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
