import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';
import { Moniteur } from 'src/app/model/moniteur.model';
import { MoniteurService } from 'src/app/service/moniteur/moniteur.service';
import { ModelMoniteurComponent } from '../modal-moniteur/modal-moniteur.component';

@Component({
  selector: 'tr[app-item-moniteur]',
  templateUrl: './item-moniteur.component.html'
})
export class ItemMoniteurComponent implements OnInit {

    @Input() moniteur: Moniteur | null = null;
    @Output() refresh_list_evnt = new EventEmitter<any>();

    editForm: FormGroup;
    deleteMoniteurDialog: boolean = false;
    updatevehDialog: boolean;
    submitted: boolean = false;
    id: any;
    titleModal: any;
    bsModalRef: BsModalRef;

    constructor(
        private moniteurService: MoniteurService,
        private toastr: ToastrService,
        public fb: FormBuilder,
        private modalService: BsModalService
    ) {}

    ngOnInit(): void {}

    deletemoniteur(moniteur: Moniteur) {
        this.deleteMoniteurDialog = true;
        this.moniteur = {...moniteur};
    }

    confirmDelete() {
        this.deleteMoniteurDialog = false;
        this.moniteurService.destroy(this.moniteur).subscribe((data) => {
            this.toastr.info('Donnée supprimer avec succèes !', 'Suppression');
            this.refresh_list_evnt.emit();
        });
    }

    openModalMon() {
        const initialState = {
            list: [
                {
                    operation: 'update',
                    value: 'Modification',
                    moniteur: this.moniteur,
                },
            ],
        };
        this.bsModalRef = this.modalService.show(ModelMoniteurComponent, {
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
