import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';
import { Examinateur } from 'src/app/model/examinateur.model';
import { ExaminateurService } from 'src/app/service/examinateur/examinateur.service';
import { ModalExaminateurComponent } from '../modal-examinateur/modal-examinateur.component';

@Component({
    selector: 'tr[app-item-examinateur]',
    templateUrl: './item-examinateur.component.html',
})
export class ItemExaminateurComponent implements OnInit {
    @Input() examinateur: Examinateur | null = null;
    @Output() refresh_list_evnt = new EventEmitter<any>();

    editForm: FormGroup;
    deleteExaminateurDialog: boolean = false;
    updatevehDialog: boolean;
    submitted: boolean = false;
    id: any;
    titleModal: any;
    bsModalRef: BsModalRef;

    constructor(
        private examinateurService: ExaminateurService,
        private toastr: ToastrService,
        public fb: FormBuilder,
        private modalService: BsModalService
    ) {}

    ngOnInit(): void {}

    deleteexaminateur(examinateur: Examinateur) {
        this.deleteExaminateurDialog = true;
        this.examinateur = { ...examinateur };
    }

    confirmDelete() {
        this.deleteExaminateurDialog = false;
        this.examinateurService.destroy(this.examinateur).subscribe((data) => {
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
                    examinateur: this.examinateur,
                },
            ],
        };
        this.bsModalRef = this.modalService.show(ModalExaminateurComponent, {
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
