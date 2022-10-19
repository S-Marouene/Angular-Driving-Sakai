import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { filter, take } from 'rxjs';
import { Vehicule } from 'src/app/model/vehicule.model';
import { VehiculeService } from 'src/app/service/vehicule/vehicule.service';
import { ModalVehComponent } from '../modal_veh/modal-veh/modal-veh.component';

@Component({
    selector: 'app-list-vehicule',
    templateUrl: './list-vehicule.component.html',
})
export class ListVehiculeComponent implements OnInit {
    titleModal: any;
    itemList = ['Book', 'Pen'];
    bsModalRef: BsModalRef;
    errors: any = null;
    formaddvehicule: FormGroup = new FormGroup({});
    deleteUserDialog: boolean = false;
    submitted = false;
    vehicule: Vehicule;
    @Input() vehicules: Vehicule[] = [];
    loading: boolean;
    @ViewChild('dt') table: Table;

    @ViewChild('filter') filter: ElementRef;

    constructor(
        public fb: FormBuilder,
        private vehiculeService: VehiculeService,
        public router: Router,
        private toastr: ToastrService,
        private modalService: BsModalService
    ) {}

    openModalveh() {
        const initialState = {
            list: [{ operation: 'add', value: 'Ajout' }],
        };
        this.bsModalRef = this.modalService.show(ModalVehComponent, {
            initialState,
        });
        this.bsModalRef.content.closeBtnName = 'Close';
        this.modalService.onHide.pipe(take(1), filter(reason => reason === 'true')).subscribe((reason: string) => {
            this.getListvehicule();
        })
    }

    ngOnInit(): void {
        this.formaddvehicule = this.fb.group({
            num_imm: ['', Validators.required],
            marque: ['', [Validators.required]],
            etat: ['', [Validators.required]],
            couleur: ['', Validators.required],
        });
    }

    getListvehicule() {
        this.vehiculeService.getVehicules().subscribe({
            next: (ListVehicule) => {
                this.vehicules = ListVehicule['data'];
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.formaddvehicule.controls;
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
