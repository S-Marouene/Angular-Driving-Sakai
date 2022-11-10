import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Code } from 'src/app/model/code.model';
import { BureauService } from 'src/app/service/bureau/bureau.service';
import { CentreExamService } from 'src/app/service/centre-exam/centre-exam.service';
import { CodeService } from 'src/app/service/code/code.service';
import {
    AbstractType,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Condidat } from 'src/app/model/condidat.model';

@Component({
    selector: 'app-modal-code',
    templateUrl: './modal-code.component.html',
})
export class ModalCodeComponent implements OnInit {
    formaddcode;
    heurs: any = ['1', '2', '3', '4'];
    date1: Date;
    myDate = new Date();

    submitted: boolean = false;
    errors: any;
    code: Code;
    titleModal: any;
    list: any[] = [];
    codes: Code[] = [];
    public centre_codes: any = [];
    public bureaux:any = [];
    type_codeRadio:boolean=false;
    public pieces: any = [
        'Droit Code Conduite',
        'Réinscription Conduite'
    ];
    prestation_modif:any;

    constructor(
        public fb: FormBuilder,
        private codeService: CodeService,
        public router: Router,
        private toastr: ToastrService,
        public bsModalRef: BsModalRef,
        private modalService: BsModalService,
        private centreExamService:CentreExamService,
        private bureauService:BureauService,
        public datepipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.formaddcode = this.fb.group({
            nbr_heure: ['', Validators.required],
            date_fin: ['', [Validators.required]],
            date_deb: ['', [Validators.required]],
            condidat_id: ['', [Validators.required]],
        });
        this.date1 = new Date();
        this.date1.setHours(this.date1.getHours() + 2);

        this.formaddcode.setValue({
            date_deb: this.datepipe.transform(
                this.myDate,
                'yyyy-MM-dd H:00'
            ) || '',
            date_fin:
                this.datepipe.transform(this.date1, 'yyyy-MM-dd H:00') || '',

            nbr_heure: '2',
            condidat_id:this.list[0].condidat_id,
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.formaddcode.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.formaddcode.patchValue({
            date_deb: this.datepipe.transform(
                this.formaddcode.value.date_deb,
                'yyyy-MM-dd H:mm'
            ),
        });

        this.codeService.register(this.formaddcode.value).subscribe(
            (result) => {},
            (error) => {
                this.errors = error.error;
            },
            () => {
                this.formaddcode.reset();
                this.bsModalRef.hide();
                this.code = {};
                this.toastr.info('code ajouter avec succée', 'Info');
                this.modalService.setDismissReason('true');
            }
        );
    }

    onUpdate(id: any) {
        this.submitted = true;

        this.formaddcode.patchValue({
            date_deb: this.datepipe.transform(
                this.formaddcode.value.date_deb,
                'yyyy-MM-dd H:mm'
            ),
        });

        if (this.formaddcode.valid) {
            this.codeService
                .update_code(this.formaddcode.value, id)
                .subscribe(
                    (result) => {},
                    (error) => {
                        this.errors = error.error;
                        console.log(this.errors);

                    },
                    () => {
                        this.formaddcode.reset();
                        this.bsModalRef.hide();
                        this.code = {};
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

    setDateFin() {
        this.date1 = new Date(this.formaddcode.value.date_deb);
        this.formaddcode.patchValue({
            date_fin:
                this.datepipe.transform(
                    this.date1.setHours(
                        this.date1.getHours() +
                        Number(this.formaddcode.value.nbr_heure)
                    ),
                    'yyyy-MM-dd H:mm'
                ) || '',
        });
    }
}
