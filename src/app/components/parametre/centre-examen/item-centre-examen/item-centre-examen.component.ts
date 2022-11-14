import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';
import { CentreExam } from 'src/app/model/centre-exam.model';
import { CentreExamService } from 'src/app/service/centre-exam/centre-exam.service';
import { ModalCentreExamenComponent } from '../modal-centre-examen/modal-centre-examen.component';

@Component({
    selector: 'tr[app-item-centre-examen]',
    templateUrl: './item-centre-examen.component.html',
})
export class ItemCentreExamenComponent implements OnInit {
    @Input() centreExam: CentreExam | null = null;
    @Output() refresh_list_evnt = new EventEmitter<any>();

    editForm: FormGroup;
    deleteCentreExamDialog: boolean = false;
    updatevehDialog: boolean;
    submitted: boolean = false;
    id: any;
    titleModal: any;
    bsModalRef: BsModalRef;

    constructor(
        private centreExamService: CentreExamService,
        private toastr: ToastrService,
        public fb: FormBuilder,
        private modalService: BsModalService
    ) {}

    ngOnInit(): void {}

    deletecentreExam(centreExam: CentreExam) {
        this.deleteCentreExamDialog = true;
        this.centreExam = { ...centreExam };
    }

    confirmDelete() {
        this.deleteCentreExamDialog = false;
        this.centreExamService.destroy(this.centreExam).subscribe((data) => {
            this.toastr.info('Donnée supprimer avec succèes !', 'Suppression');
            this.refresh_list_evnt.emit();
        });
    }

    openModalcentre() {
        const initialState = {
            list: [
                {
                    operation: 'update',
                    value: 'Modification',
                    centreExam: this.centreExam,
                },
            ],
        };
        this.bsModalRef = this.modalService.show(ModalCentreExamenComponent, {
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
