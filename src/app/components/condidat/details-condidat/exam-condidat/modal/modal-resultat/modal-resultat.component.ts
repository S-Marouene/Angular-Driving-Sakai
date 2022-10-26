import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Examen } from 'src/app/model/examen.model';
import { BureauService } from 'src/app/service/bureau/bureau.service';
import { CentreExamService } from 'src/app/service/centre-exam/centre-exam.service';
import { ExamenService } from 'src/app/service/examen/examen.service';
import { ExaminateurService } from 'src/app/service/examinateur/examinateur.service';

@Component({
    selector: 'app-modal-resultat',
    templateUrl: './modal-resultat.component.html',
})
export class ModalResultatComponent implements OnInit {
    formaddexamen;
    submitted: boolean = false;
    errors: any;
    examen: Examen;
    titleModal: any;
    list: any[] = [];
    examens: Examen[] = [];
    public centre_examens: any = [];
    public examinateurs: any = [];

    type_examenRadio: boolean = false;
    public pieces: any = ['Droit Examen Conduite', 'Réinscription Conduite'];
    prestation_modif: any;

    constructor(
        public fb: FormBuilder,
        private examenService: ExamenService,
        public router: Router,
        private toastr: ToastrService,
        public bsModalRef: BsModalRef,
        private modalService: BsModalService,
        private examinateurService: ExaminateurService,
        public datepipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.examinateurService.getExaminateurs().subscribe({
            next: (ListExaminateur) => {
                this.examinateurs = ListExaminateur['data'];
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });

        this.formaddexamen = this.fb.group({
            examinateur: ['', Validators.required],
            resultat: ['', Validators.required],
            condidat_id: ['', Validators.required],
        });

        this.formaddexamen.setValue({
            resultat: this.list[0].examen?.resultat || '',
            examinateur: this.list[0].examen?.examinateur || ' ',
            condidat_id: this.list[0].condidat_id,
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.formaddexamen.controls;
    }

    onUpdate(id: any) {
        this.submitted = true;
        if (this.formaddexamen.valid) {
            this.examenService
                .update_result(this.formaddexamen.value, id)
                .subscribe(
                    (result) => {},
                    (error) => {
                        this.errors = error.error;
                        console.log(this.errors);
                    },
                    () => {
                        this.formaddexamen.reset();
                        this.bsModalRef.hide();
                        this.examen = {};
                        this.toastr.info('Donnée Modifier avec succée', 'Info');
                        this.modalService.setDismissReason('true');
                        this.submitted = false;
                    }
                );
        }
    }

    Close() {
        this.bsModalRef.hide();
        this.submitted = false;
    }
}
