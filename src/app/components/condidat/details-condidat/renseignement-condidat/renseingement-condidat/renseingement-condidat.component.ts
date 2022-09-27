import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Condidat } from 'src/app/model/condidat.model';
import { CondidatService } from 'src/app/service/condidat/condidat.service';

@Component({
    selector: 'app-renseingement-condidat',
    templateUrl: './renseingement-condidat.component.html',
})
export class RenseingementCondidatComponent implements OnInit {
    @Input() condidat: Condidat;

    constructor(private condidatservice : CondidatService,
        private toastr : ToastrService,
        public router: Router,
        public datepipe: DatePipe
        ) {}
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
    valExamen: string;
    valTypeContrat: string;
    valTContratCond: string;
    valPieceFournie: string;
    selectedDatenaiss: any;
    selectedDateAvSys: any;
    submitted = false;
    form: FormGroup = new FormGroup({});
    imageSrc: string = '';
    files: any;
    piece_fournit: string;
    selectedpiece_fournit: string[];
    deleteCondidatDialog: boolean = false;
    errors: any = null;
    type_c_code: string = 'Par heure';
    type_c_cond: string = 'Par heure';

    ngOnChanges(): void {
        this.piece_fournit = this.condidat?.piece_fournit;
        if (this.piece_fournit === null || this.piece_fournit === undefined) {
            this.piece_fournit = '';
        } else {
            this.selectedpiece_fournit = this.piece_fournit.split(',');
        }
    }

    ngOnInit(): void {
        this.condidat = {};
    }

    onFileChange(event: any) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.imageSrc = reader.result as string;
                this.form.patchValue({
                    fileSource: reader.result,
                });
            };
        }
        this.files = event.target.files[0];
    }
    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    deleteCondidat(condidat: Condidat) {
        this.deleteCondidatDialog = true;
        this.condidat = { ...condidat };
    }

    confirmDelete() {
        this.deleteCondidatDialog = false;
        this.condidatservice.destroy(this.condidat).subscribe(
            data => {
              this.router.navigate(['condidat']);
              this.toastr.info("Condidat supprimer avec succèes !", "Suppression");
            },
            (error) => {
                this.errors = error.error;
                this.toastr.error(this.errors)
            },
          );
    }

    UpdateCondidat() {
        this.submitted = true;
        const formData = new FormData();
        if(this.files != null){
            formData.append('fileSource', this.files,this.files.name);
            formData.append('photo',this.files.name);
        }else{
            formData.append('fileSource', '');
            formData.append('photo','');
        }
        if (this.condidat.type_c_code == 'Par heure') {
            this.type_c_code = 'Par heure';
            this.condidat.prix_frf_code = '';
        } else {
            this.type_c_code = 'Forfaitaire';
            this.condidat.prix_hr_code = '';
        }
        if (this.condidat.type_c_cond == 'Par heure') {
            this.type_c_cond = 'Par heure';
            this.condidat.prix_frf_cond = '';
        } else {
            this.type_c_cond = 'Forfaitaire';
            this.condidat.prix_hr_cond = '';
        }

        formData.append('id',this.condidat.id);
        formData.append('nom',this.condidat.nom);
        formData.append('prenom',this.condidat.prenom);
        formData.append('cin',this.condidat.cin);
        formData.append('categorie', this.condidat.categorie);
        formData.append('email', this.condidat.email);
        formData.append(
            'date_naiss',
            this.datepipe.transform(
                this.condidat.date_naiss,
                'yyyy-MM-dd'
            )
        );
        formData.append('adresse', this.condidat.adresse);
        formData.append('num_tel', this.condidat.num_tel);
        formData.append('piece_fournit', this.selectedpiece_fournit.toString());
        formData.append('bureau', this.condidat.bureau);
        formData.append('examen', this.condidat.examen);

        formData.append('type_c_code',this.condidat.type_c_code);
        formData.append('prix_frf_code',this.condidat.prix_frf_code);
        formData.append('prix_hr_code',this.condidat.prix_hr_code);
        formData.append('type_c_cond',this.condidat.type_c_cond);
        formData.append('prix_frf_cond', this.condidat.prix_frf_cond);
        formData.append('prix_hr_cond', this.condidat.prix_hr_cond);

        formData.append(
            'hist_av_date',
            this.datepipe.transform(
                this.condidat.hist_av_date,
                'yyyy-MM-dd'
            )
        );
        formData.append('hist_montant_paye', this.condidat.hist_montant_paye);
        formData.append('hist_nb_hr_code', this.condidat.hist_nb_hr_code);
        formData.append('hist_nb_hr_cond', this.condidat.hist_nb_hr_cond);
        formData.append('hist_nb_reinsc_cond', this.condidat.hist_nb_reinsc_cond);
        formData.append('hist_caisse', this.condidat.hist_caisse);
        formData.append('hist_nb_exam_code', this.condidat.hist_nb_exam_code);
        formData.append('hist_nb_exam_cond', this.condidat.hist_nb_exam_cond);
        formData.append('hist_nb_reinsc_code', this.condidat.hist_nb_reinsc_code);
        formData.append('hist_nb_droit_exam', this.condidat.hist_nb_droit_exam);

        this.condidatservice.update_cond(formData).subscribe(
            data => {
                this.router.navigate(['/']).then(() => {
                    this.router.navigate(['/condidat',  this.condidat.id]);
                });
                this.toastr.info("Donnée modifier avec succèes !", "Mise à jour");
            }
        );
    }

}
