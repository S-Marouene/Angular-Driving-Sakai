import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';
import { Code } from 'src/app/model/code.model';
import { Condidat } from 'src/app/model/condidat.model';
import { CodeService } from 'src/app/service/code/code.service';
import { ModalFullCodeComponent } from '../modal-full-code/modal-full-code.component';

@Component({
  selector: 'tr[app-list-code]',
  templateUrl: './list-code.component.html'
})
export class ListCodeComponent implements OnInit {

        @Input() code: Code | null = null;
        @Output() refresh_list_evnt = new EventEmitter<any>();

        editForm: FormGroup;
        deleteCodeDialog: boolean = false;
        updatevehDialog: boolean;
        submitted: boolean = false;
        id: any;
        titleModal: any;
        bsModalRef: BsModalRef;

        constructor(
            private codeService: CodeService,
            private toastr: ToastrService,
            public fb: FormBuilder,
            private modalService: BsModalService
        ) {}

        ngOnInit(): void {}

        deletecode(code: Code) {
            this.deleteCodeDialog = true;
            this.code = {...code};
        }

        confirmDelete() {
            this.deleteCodeDialog = false;
            this.codeService.destroy(this.code).subscribe((data) => {
                this.toastr.info('Donnée supprimer avec succèes !', 'Suppression');
                this.refresh_list_evnt.emit();
            });
        }

        openModalExam() {
            const initialState = {
                list: [
                    {
                        operation: 'update',
                        value: 'Modification',
                        code: this.code,
                        title:this.code.condidat['prenom']+' '+this.code.condidat['nom'],
                        condidat: this.code.condidat,
                    },
                ],
            };
            this.bsModalRef = this.modalService.show(ModalFullCodeComponent, {
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
