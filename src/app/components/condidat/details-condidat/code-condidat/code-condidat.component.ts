import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { filter, take } from 'rxjs';
import { Code } from 'src/app/model/code.model';
import { Condidat } from 'src/app/model/condidat.model';
import { CodeService } from 'src/app/service/code/code.service';
import { ModalCodeComponent } from './modal-code/modal-code.component';

@Component({
  selector: 'app-code-condidat',
  templateUrl: './code-condidat.component.html'
})
export class CodeCondidatComponent implements OnInit {

    codes: Code[] = [];
    code: Code;
    loading: boolean;
    bsModalRef: BsModalRef;
    errors: any = null;
    submitted = false;
    @Input() condidat: Condidat;

    constructor(
        private codeService: CodeService,
        private modalService: BsModalService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
            this.codeService.getCodes().subscribe({
                next: (ListCode) => {
                    this.codes = ListCode['data'];
                    console.log(this.codes);

                },
                error: () => {
                    console.log(
                        `Problème au niveau du serveur, attention les données sont fake `
                    );
                },
            });
    }

    openModalcode() {

            const initialState = {
                list: [
                    {
                        operation: 'add',
                        value: 'Ajout',
                        condidat_id: this.condidat.id,
                    },
                ],
            };
        this.bsModalRef = this.modalService.show(ModalCodeComponent, {
            initialState
        });
        this.bsModalRef.content.closeBtnName = 'Close';
        this.modalService.onHide
            .pipe(
                take(1),
                filter((reason) => reason === 'true')
            )
            .subscribe((reason: string) => {
                this.getListcode();
            });
    }

    getListcode() {
        this.codeService.getCodes().subscribe({
            next: (ListCode) => {
                this.codes = ListCode['data'];
                console.log(this.codes);
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });
    }
}
