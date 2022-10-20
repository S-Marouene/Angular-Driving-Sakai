import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { filter, take } from 'rxjs';
import { CentreExam } from 'src/app/model/centre-exam.model';
import { CentreExamService } from 'src/app/service/centre-exam/centre-exam.service';
import { ModalCentreExamenComponent } from './modal-centre-examen/modal-centre-examen.component';

@Component({
    selector: 'app-centre-examen',
    templateUrl: './centre-examen.component.html',
})
export class CentreExamenComponent implements OnInit {
    centreExams: CentreExam[] = [];
    centreExam: CentreExam;
    loading: boolean;
    bsModalRef: BsModalRef;
    errors: any = null;
    submitted = false;

    constructor(
        private centreExamService: CentreExamService,
        private modalService: BsModalService
    ) {}

    ngOnInit(): void {
        this.centreExamService.getCentreExams().subscribe({
            next: (ListCentreExam) => {
                this.centreExams = ListCentreExam['data'];
                console.log(this.centreExams);
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
            list: [{ operation: 'add', value: 'Ajout' }],
        };
        this.bsModalRef = this.modalService.show(ModalCentreExamenComponent, {
            initialState,
        });
        this.bsModalRef.content.closeBtnName = 'Close';
        this.modalService.onHide
            .pipe(
                take(1),
                filter((reason) => reason === 'true')
            )
            .subscribe((reason: string) => {
                this.getListcentreExam();
            });
    }

    getListcentreExam() {
        this.centreExamService.getCentreExams().subscribe({
            next: (ListCentreExam) => {
                this.centreExams = ListCentreExam['data'];
                console.log(this.centreExams);
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });
    }
}
