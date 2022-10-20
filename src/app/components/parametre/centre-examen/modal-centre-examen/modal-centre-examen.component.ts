import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CentreExam } from 'src/app/model/centre-exam.model';
import { CentreExamService } from 'src/app/service/centre-exam/centre-exam.service';

@Component({
    selector: 'app-modal-centre-examen',
    templateUrl: './modal-centre-examen.component.html',
})
export class ModalCentreExamenComponent implements OnInit {
    formaddcentreExam;
    submitted: boolean = false;
    errors: any;
    centreExam: CentreExam;
    titleModal: any;
    list: any[] = [];
    centreExamx: CentreExam[] = [];

    constructor(
        public fb: FormBuilder,
        private centreExamService: CentreExamService,
        public router: Router,
        private toastr: ToastrService,
        public bsModalRef: BsModalRef,
        private modalService: BsModalService
    ) {}

    ngOnInit(): void {
        this.formaddcentreExam = this.fb.group({
            libelle: ['', Validators.required],
            type: ['', [Validators.required]],
        });

        this.formaddcentreExam.setValue({
            libelle: this.list[0].centreExam?.libelle || '',
            type: this.list[0].centreExam?.type || '',
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.formaddcentreExam.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.centreExamService.register(this.formaddcentreExam.value).subscribe(
            (result) => {},
            (error) => {
                this.errors = error.error;
            },
            () => {
                this.formaddcentreExam.reset();
                this.bsModalRef.hide();
                this.centreExam = {};
                this.toastr.info('centreExam ajouter avec succée', 'Info');
                this.modalService.setDismissReason('true');
            }
        );
    }

    onUpdate(id: any) {
        this.submitted = true;
        if (this.formaddcentreExam.valid) {
            this.centreExamService
                .update_cex(this.formaddcentreExam.value, id)
                .subscribe(
                    (result) => {},
                    (error) => {
                        this.errors = error.error;
                    },
                    () => {
                        this.formaddcentreExam.reset();
                        this.bsModalRef.hide();
                        this.centreExam = {};
                        this.toastr.info('Donnée Modifier avec succée', 'Info');
                        this.modalService.setDismissReason('true');
                    }
                );
        }
    }

    hideDialog() {
        this.bsModalRef.hide();
        this.submitted = false;
    }
}
