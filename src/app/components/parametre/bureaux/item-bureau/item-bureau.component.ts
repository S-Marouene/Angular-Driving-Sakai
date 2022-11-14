import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';
import { Bureau } from 'src/app/model/bureau.model';
import { BureauService } from 'src/app/service/bureau/bureau.service';
import { ModelBureauComponent } from '../model-bureau/model-bureau/model-bureau.component';

@Component({
    selector: 'tr[app-item-bureau]',
    templateUrl: './item-bureau.component.html',
})
export class ItemBureauComponent implements OnInit {
    @Input() bureau: Bureau | null = null;
    @Output() refresh_list_evnt = new EventEmitter<any>();

    editForm: FormGroup;
    deleteBureauDialog: boolean = false;
    updatevehDialog: boolean;
    submitted: boolean = false;
    id: any;
    titleModal: any;
    bsModalRef: BsModalRef;

    constructor(
        private bureauService: BureauService,
        private toastr: ToastrService,
        public fb: FormBuilder,
        private modalService: BsModalService
    ) {}

    ngOnInit(): void {}

    deletebureau(bureau: Bureau) {
        this.deleteBureauDialog = true;
        this.bureau = {...bureau};
    }

    confirmDelete() {
        this.deleteBureauDialog = false;
        this.bureauService.destroy(this.bureau).subscribe((data) => {
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
                    bureau: this.bureau,
                },
            ],
        };
        this.bsModalRef = this.modalService.show(ModelBureauComponent, {
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
