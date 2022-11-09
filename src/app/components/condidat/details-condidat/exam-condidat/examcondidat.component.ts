import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { filter, take } from 'rxjs';
import { Condidat } from 'src/app/model/condidat.model';
import { Examen } from 'src/app/model/examen.model';
import { ExamenService } from 'src/app/service/examen/examen.service';
import { ModalExamComponent } from './modal/modal-exam/modal-exam.component';

@Component({
    selector: 'app-examcondidat',
    templateUrl: './examcondidat.component.html',
})
export class ExamcondidatComponent implements OnInit {
    examens: Examen[] = [];
    examen: Examen;
    loading: boolean;
    bsModalRef: BsModalRef;
    errors: any = null;
    submitted = false;
    @Input() condidat: Condidat;

    constructor(
        private examenService: ExamenService,
        private modalService: BsModalService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.examenService.getExamenByCondidat(params.id).subscribe({
                next: (ListExamen) => {
                    this.examens = ListExamen['data'];
                },
                error: () => {
                    console.log(
                        `Problème au niveau du serveur, attention les données sont fake `
                    );
                },
            });
        });
    }

    openModalveh() {
        const initialState = {
            list: [
                {
                    operation: 'add',
                    value: 'Ajout',
                    condidat_id: this.condidat.id,
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
        this.examenService.getExamens().subscribe({
            next: (ListExamen) => {
                this.examens = ListExamen['data'];
                console.log(this.examens);
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });
    }
}
