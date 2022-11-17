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
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ToastModule } from 'primeng/toast';
import { Vehicule } from 'src/app/model/vehicule.model';
import { VehiculeService } from 'src/app/service/vehicule/vehicule.service';

@Component({
    selector: 'app-modal-veh',
    templateUrl: './modal-veh.component.html',
})
export class ModalVehComponent implements OnInit {
    formaddvehicule;
    submitted: boolean = false;
    errors: any;
    vehicule: Vehicule;
    titleModal: any;
    list: any[] = [];
    vehicules: Vehicule[] = [];
    public couleurs: any = [
        'Rouge',
        'Bleu',
        'Vert',
        'Jaune',
        'Noir',
        'Blanc',
    ];

    constructor(
        public fb: FormBuilder,
        private vehiculeService: VehiculeService,
        public router: Router,
        private toastr: ToastrService,
        public bsModalRef: BsModalRef,
        private modalService: BsModalService
    ) {}

    ngOnInit(): void {
        this.formaddvehicule = this.fb.group({
            num_imm: ['', Validators.required],
            marque: ['', [Validators.required]],
            etat: ['', [Validators.required]],
            couleur: ['', Validators.required],
        });

        this.formaddvehicule.setValue({
            num_imm: this.list[0].vehicule?.num_imm || '',
            marque: this.list[0].vehicule?.marque || '',
            etat: this.list[0].vehicule?.etat || '',
            couleur: this.list[0].vehicule?.couleur || '',
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.formaddvehicule.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.vehiculeService.register(this.formaddvehicule.value).subscribe(
            (result) => {},
            (error) => {
                this.errors = error.error;
            },
            () => {
                this.formaddvehicule.reset();
                this.bsModalRef.hide();
                this.vehicule = {};
                this.toastr.info('Vehicule ajouter avec succée', 'Info');
                this.modalService.setDismissReason('true');
            }
        );
    }

    onUpdate(id: any) {
        this.submitted = true;
        if (this.formaddvehicule.valid) {
            this.vehiculeService
                .update_veh(this.formaddvehicule.value, id)
                .subscribe(
                    (result) => {},
                    (error) => {
                        this.errors = error.error;
                    },
                    () => {
                        this.formaddvehicule.reset();
                        this.bsModalRef.hide();
                        this.vehicule = {};
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
