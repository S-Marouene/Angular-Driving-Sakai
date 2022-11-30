import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { filter, take } from 'rxjs';
import { Condidat } from 'src/app/model/condidat.model';
import { Examen } from 'src/app/model/examen.model';
import { ExamenService } from 'src/app/service/examen/examen.service';
import { ModalExamComponent } from '../../condidat/details-condidat/exam-condidat/modal/modal-exam/modal-exam.component';

@Component({
  selector: 'app-modal-resul-caldr',
  templateUrl: './modal-resul-caldr.component.html'
})
export class ModalResulCaldrComponent implements OnInit {
        examens: Examen[] = [];
        examen: Examen;
        loading: boolean;
        errors: any = null;
        submitted = false;
        list: any[] = [];
        @Input() condidat: Condidat;

        constructor(
            private examenService: ExamenService,
            private modalService: BsModalService,
            public bsModalRef: BsModalRef,
        ) {}

        ngOnInit(): void {

                this.examenService.getExamenByCondidat(this.list[0].condidat_id).subscribe({
                    next: (ListExamen) => {
                        this.examens = ListExamen['data'];
                    },
                    error: () => {
                        console.log(
                            `Problème au niveau du serveur, attention les données sont fake `
                        );
                    },
                });
        }

        openModalveh() {
            const initialState = {
                list: [
                    {
                        operation: 'add',
                        value: 'Ajout',
                        condidat_id: this.list[0].condidat_id,
                    },
                ],
            };
            this.bsModalRef = this.modalService.show(ModalExamComponent, {
                initialState,
                class: 'modal-lg',
            });
            this.bsModalRef.content.closeBtnName = 'Close';
            this.modalService.onHide
                .pipe(
                    take(1),
                    filter((reason) => reason === 'true')
                )
                .subscribe((reason: string) => {
                    this.getListexamen();
                });
        }

        getListexamen() {
                this.examenService.getExamenByCondidat(this.list[0].condidat_id).subscribe({
                    next: (ListExamen) => {
                        this.examens = ListExamen['data'];
                    },
                    error: () => {
                        console.log(
                            `Problème au niveau du serveur, attention les données sont fake `
                        );
                    },
            })
        }

        hideDialog() {
            this.bsModalRef.hide();
            this.submitted = false;
        }

}
