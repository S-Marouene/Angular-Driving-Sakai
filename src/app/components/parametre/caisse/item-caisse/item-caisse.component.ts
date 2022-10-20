import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';
import { Caisse } from 'src/app/model/caisse.model';
import { CaisseService } from 'src/app/service/caisse/caisse.service';
import { ModalCaisseComponent } from '../modal-caisse/modal-caisse.component';

@Component({
  selector: 'tr[app-item-caisse]',
  templateUrl: './item-caisse.component.html'
})
export class ItemCaisseComponent implements OnInit {
    @Input() caisse: Caisse | null = null;
    @Output() refresh_list_evnt = new EventEmitter<any>();

    editForm: FormGroup;
    deleteCaisseDialog: boolean = false;
    updatevehDialog: boolean;
    submitted: boolean = false;
    id: any;
    titleModal: any;
    bsModalRef: BsModalRef;

    constructor(
        private caisseService: CaisseService,
        private toastr: ToastrService,
        public fb: FormBuilder,
        private modalService: BsModalService
    ) {}

    ngOnInit(): void {}

    deletecaisse(caisse: Caisse) {
        this.deleteCaisseDialog = true;
        this.caisse = {...caisse};
        console.log(this.caisse);

    }

    confirmDelete() {
        this.deleteCaisseDialog = false;
        this.caisseService.destroy(this.caisse).subscribe((data) => {
            this.toastr.info('Donnée supprimer avec succèes !', 'Suppression');
            this.refresh_list_evnt.emit();
        });
    }

    openModalveh() {
        const initialState = {
            list: [
                {
                    operation: 'update',
                    value: 'Modification',
                    caisse: this.caisse,
                },
            ],
        };
        this.bsModalRef = this.modalService.show(ModalCaisseComponent, {
            initialState,
        });
        this.bsModalRef.content.closeBtnName = 'Close';

        this.modalService.onHide
            .pipe(
                take(1),
                filter((reason) => reason === 'true')
            )
            .subscribe((reason: string) => {
                this.refresh_list_evnt.emit();
            });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.editForm.controls;
    }

}
