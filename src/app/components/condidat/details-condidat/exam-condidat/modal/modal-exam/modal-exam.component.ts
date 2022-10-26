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

@Component({
    selector: 'app-modal-exam',
    templateUrl: './modal-exam.component.html',
})
export class ModalExamComponent implements OnInit {
    formaddexamen;
    submitted: boolean = false;
    errors: any;
    examen: Examen;
    titleModal: any;
    list: any[] = [];
    examens: Examen[] = [];
    public centre_examens: any = [];
    public bureaux:any = [];
    type_examenRadio:boolean=false;
    public pieces: any = [
        'Droit Examen Conduite',
        'Réinscription Conduite'
    ];
    prestation_modif:any;

    constructor(
        public fb: FormBuilder,
        private examenService: ExamenService,
        public router: Router,
        private toastr: ToastrService,
        public bsModalRef: BsModalRef,
        private modalService: BsModalService,
        private centreExamService:CentreExamService,
        private bureauService:BureauService,
        public datepipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.centreExamService.getCentreExams().subscribe({
            next: (ListCentreExam) => {
                this.centre_examens = ListCentreExam['data'];
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });

        this.bureauService.getBureaux().subscribe({
            next: (ListBureau) => {
                this.bureaux = ListBureau['data'];
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });

        this.formaddexamen = this.fb.group({

            num_liste: ['', Validators.required],
            num_convocation: ['', [Validators.required]],
            date_examen: ['', [Validators.required]],
            centre_examen: ['', Validators.required],
            type_examen: ['', Validators.required],
            bureau: ['', Validators.required],
            prestation: ['', Validators.required],
            prestation_cond: ['', Validators.required],
            condidat_id: ['', Validators.required],
        });

        /* this.type_examenRadio= this.list[0].examen?.type_examen=='Conduite' ? true : false; */
        if (this.list[0].examen?.type_examen=='Conduite') {
            this.type_examenRadio=true
            this.prestation_modif=[this.list[0].examen?.prestation.split(",")][0]
        }


        this.formaddexamen.setValue({
            num_liste: this.list[0].examen?.num_liste || '',
            num_convocation: this.list[0].examen?.num_convocation || '',
            date_examen: this.datepipe.transform(
                this.list[0].examen?.date_examen,
                'yyyy-MM-dd H:mm'
            ) || '',
            centre_examen: this.list[0].examen?.centre_examen || '',
            type_examen: this.type_examenRadio,
            bureau: this.list[0].examen?.bureau || '',
            prestation: this.list[0].examen?.prestation || '',
            condidat_id: this.list[0].condidat_id,
            prestation_cond:  this.prestation_modif || false,
        });

    }

    get f(): { [key: string]: AbstractControl } {
        return this.formaddexamen.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.formaddexamen.value.date_examen=this.datepipe.transform(
            this.formaddexamen.value.date_examen,
            'yyyy-MM-dd H:mm'
        )
        if (this.formaddexamen.value.type_examen == true) {
            this.formaddexamen.value.type_examen = 'Conduite';
            this.formaddexamen.value.prestation=''
            this.formaddexamen.value.prestation = this.formaddexamen.value.prestation?.toString() || this.formaddexamen.value.prestation_cond.toString()

        } else {
            this.formaddexamen.value.type_examen = 'Code';
            this.formaddexamen.value.prestation_cond=''
            this.formaddexamen.value.prestation =  this.formaddexamen.value.prestation?.toString() || this.formaddexamen.value.prestation_cond.toString()

        }

        this.examenService.register(this.formaddexamen.value).subscribe(
            (result) => {},
            (error) => {
                this.errors = error.error;
            },
            () => {
                this.formaddexamen.reset();
                this.bsModalRef.hide();
                this.examen = {};
                this.toastr.info('examen ajouter avec succée', 'Info');
                this.modalService.setDismissReason('true');
            }
        );
    }

    onUpdate(id: any) {
        this.submitted = true;

        this.formaddexamen.value.date_examen=this.datepipe.transform(
            this.formaddexamen.value.date_examen,
            'yyyy-MM-dd H:mm'
        )
        if (this.formaddexamen.value.type_examen == true) {
            this.formaddexamen.value.type_examen = 'Conduite';
            this.formaddexamen.value.prestation=''
            this.formaddexamen.value.prestation = this.formaddexamen.value.prestation?.toString() || this.formaddexamen.value.prestation_cond.toString()

        } else {
            this.formaddexamen.value.type_examen = 'Code';
            this.formaddexamen.value.prestation_cond=''
            this.formaddexamen.value.prestation =  this.formaddexamen.value.prestation?.toString() || this.formaddexamen.value.prestation_cond.toString()

        }

        if (this.formaddexamen.valid) {
            this.examenService
                .update_Exam(this.formaddexamen.value, id)
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

    hideDialog() {
        this.bsModalRef.hide();
        this.submitted = false;
    }
}
