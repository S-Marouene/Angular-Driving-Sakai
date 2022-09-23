import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { CONSTANTES } from 'src/app/constantes/constantes';
import { Condidat } from 'src/app/model/condidat.model';
import { CondidatService } from 'src/app/service/condidat/condidat.service';

@Component({
    selector: 'app-list-condidat',
    templateUrl: './list-condidat.component.html',
})
export class ListCondidatComponent implements OnInit {
    @Input() condidats: Condidat[] = [];
    loading: boolean;

    @ViewChild('filter') filter: ElementRef;
    form_condidat: FormGroup = new FormGroup({});
    CondidatDialog: boolean;
    public categories: any = [
        'B',
        'A',
        'A1',
        'C',
        'D',
        'B+E',
        'C+E',
        'D+E',
        'H',
    ];
    public bureaux: any = ['Menzel temime', 'Nabeul', 'Kélibiya', 'Autres...'];
    public pieces: any = [
        'Photos',
        'Certificat médical',
        'Quittance Paiement',
        'CIN',
    ];
    valExamen: string;
    valTypeContrat: string;
    valTContratCond: string;
    valPieceFournie: string[] = [];
    selectedDatenaiss: any;
    selectedDateAvSys: any;
    submitted = false;
    imageSrc: string = '';
    files: any;
    form: FormGroup;
    errors: any = null;
    numberRegEx = /\-?\d*\.?\d{1,2}/;
    selected_t_c_code: any = false;
    selected_t_c_cond: any = false;
    type_c_code: string = 'Par heure';
    type_c_cond: string = 'Par heure';
    condidat: Condidat;

    constructor(
        public fb: FormBuilder,
        private toastr: ToastrService,
        public datepipe: DatePipe,
        private condidatservice: CondidatService
    ) {}

    ngOnInit(): void {
        this.selected_t_c_code = true;
        this.selected_t_c_cond = true;

        this.form_condidat = this.fb.group({
            nom: ['', Validators.required],
            phone: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(12),
                ],
            ],
            cin: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern(this.numberRegEx),
                ],
            ],

            email: ['', [Validators.required, Validators.email]],
            bureau: ['', [Validators.required]],
            categorie: ['', Validators.required],
            piece: ['', Validators.required],
            exam: ['', Validators.required],
            prenom: ['', [Validators.required]],
            date_naiss: ['', Validators.required],
            address: ['', Validators.required],
            image: ['', Validators.nullValidator],
            type_c_code: ['', Validators.required],
            type_c_cond: ['', Validators.required],
            prix_h_code: ['', Validators.required],
            prix_forfaitaire_code: ['', Validators.required],
            prix_h_cond: ['', Validators.required],
            prix_forfaitaire_cond: ['', Validators.required],
            hist_av_date: ['', Validators.required],
            hist_montant_paye: ['', Validators.required],
            hist_nb_hr_code: ['', Validators.nullValidator],
            hist_nb_hr_cond: ['', Validators.nullValidator],
            hist_nb_reinsc_cond: ['', Validators.nullValidator],
            hist_caisse: ['', Validators.required],
            hist_nb_exam_code: ['', Validators.nullValidator],
            hist_nb_exam_cond: ['', Validators.nullValidator],
            hist_nb_reinsc_code: ['', Validators.nullValidator],
            hist_nb_droit_exam: ['', Validators.nullValidator],
        });
    }

    onSubmit() {
        this.submitted = true;
        const formData = new FormData();
        if (this.files) {
            formData.append('fileSource', this.files, this.files.name);
            formData.append('path', this.files.name);
        } else {
            formData.append('fileSource', '');
            formData.append('path', '');
        }
        if (this.files) {
            formData.append('fileSource', this.files, this.files.name);
            formData.append('path', this.files.name);
        } else {
            formData.append('fileSource', '');
            formData.append('path', '');
        }

        if (this.form_condidat.value.type_c_code == true) {
            this.type_c_code = 'Par heure';
            this.form_condidat.value.prix_forfaitaire_code = '';
        } else {
            this.type_c_code = 'Forfaitaire';
            this.form_condidat.value.prix_h_code = '';
        }
        if (this.form_condidat.value.type_c_cond == true) {
            this.type_c_cond = 'Par heure';
            this.form_condidat.value.prix_forfaitaire_cond = '';
        } else {
            this.type_c_cond = 'Forfaitaire';
            this.form_condidat.value.prix_h_cond = '';
        }

        formData.append('nom', this.form_condidat.value.nom);
        formData.append('categorie', this.form_condidat.value.categorie);
        formData.append('cin', this.form_condidat.value.cin);
        formData.append('email', this.form_condidat.value.email);
        formData.append('prenom', this.form_condidat.value.prenom);
        formData.append(
            'date_naiss',
            this.datepipe.transform(
                this.form_condidat.value.date_naiss,
                'yyyy-MM-dd'
            )
        );
        formData.append('adresse', this.form_condidat.value.address);
        formData.append('num_tel', this.form_condidat.value.phone);
        formData.append('piece_fournit', this.form_condidat.value.piece);
        formData.append('bureau', this.form_condidat.value.bureau);
        formData.append('examen', this.form_condidat.value.exam);
        formData.append('type_c_code', this.type_c_code);
        formData.append('type_c_cond', this.type_c_cond);
        formData.append('prix_hr_code', this.form_condidat.value.prix_h_code);
        formData.append(
            'prix_frf_code',
            this.form_condidat.value.prix_forfaitaire_code
        );
        formData.append('prix_hr_cond', this.form_condidat.value.prix_h_cond);
        formData.append(
            'prix_frf_cond',
            this.form_condidat.value.prix_forfaitaire_cond
        );
        formData.append(
            'hist_av_date',
            this.datepipe.transform(
                this.form_condidat.value.hist_av_date,
                'yyyy-MM-dd'
            )
        );
        formData.append(
            'hist_montant_paye',
            this.form_condidat.value.hist_montant_paye
        );
        formData.append(
            'hist_nb_hr_code',
            this.form_condidat.value.hist_nb_hr_code
        );
        formData.append(
            'hist_nb_hr_cond',
            this.form_condidat.value.hist_nb_hr_cond
        );
        formData.append(
            'hist_nb_reinsc_cond',
            this.form_condidat.value.hist_nb_reinsc_cond
        );
        formData.append('hist_caisse', this.form_condidat.value.hist_caisse);
        formData.append(
            'hist_nb_exam_code',
            this.form_condidat.value.hist_nb_exam_code
        );
        formData.append(
            'hist_nb_exam_cond',
            this.form_condidat.value.hist_nb_exam_cond
        );
        formData.append(
            'hist_nb_reinsc_code',
            this.form_condidat.value.hist_nb_reinsc_code
        );
        formData.append(
            'hist_nb_droit_exam',
            this.form_condidat.value.hist_nb_droit_exam
        );

        this.condidatservice.register(formData).subscribe(
            (result) => {
                console.log(result);
            },
            (error) => {
                this.errors = error.error;
                console.log(this.errors);
            },
            () => {
                /* this.refreshListUser();*/
                this.imageSrc = null;
                this.form_condidat.reset();
                this.CondidatDialog = false;
                this.condidat = {};
                this.toastr.info('Condidat ajouter avec succée', 'Info');
            }
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    openNew() {
        this.condidat = {};
        this.submitted = false;
        this.CondidatDialog = true;
    }
    hideDialog() {
        this.CondidatDialog = false;
        this.submitted = false;
        /* this.updateUserDialog =false;
         */
    }
    onFileChange(event: any) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.imageSrc = reader.result as string;
                this.form_condidat.patchValue({
                    fileSource: reader.result,
                });
            };
        }
        this.files = event.target.files[0];
    }
    get f(): { [key: string]: AbstractControl } {
        return this.form_condidat.controls;
    }
}
