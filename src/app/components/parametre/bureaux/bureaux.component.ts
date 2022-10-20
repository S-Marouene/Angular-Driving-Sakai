import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { filter, take } from 'rxjs';
import { Bureau } from 'src/app/model/bureau.model';
import { BureauService } from 'src/app/service/bureau/bureau.service';
import { ModelBureauComponent } from './model-bureau/model-bureau/model-bureau.component';

@Component({
  selector: 'app-bureaux',
  templateUrl: './bureaux.component.html',
})
export class BureauxComponent implements OnInit {
    bureaux: Bureau[] = [];
    bureau: Bureau;
    loading:boolean;
    bsModalRef: BsModalRef;
    errors: any = null;
    submitted = false;


    constructor(private bureauService:BureauService,
        private modalService: BsModalService) { }

    ngOnInit(): void {
        this.bureauService.getBureaux().subscribe({
            next: (ListBureau) => {
                this.bureaux = ListBureau['data'];
                console.log(this.bureaux);
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });
    }

    openModalveh() {
        const initialState = {
            list: [{ operation: 'add', value: 'Ajout' }],
        };
        this.bsModalRef = this.modalService.show(ModelBureauComponent, {
            initialState,
        });
        this.bsModalRef.content.closeBtnName = 'Close';
        this.modalService.onHide.pipe(take(1), filter(reason => reason === 'true')).subscribe((reason: string) => {
            this.getListbureau();
        })
    }

    getListbureau() {
        this.bureauService.getBureaux().subscribe({
            next: (ListBureau) => {
                this.bureaux = ListBureau['data'];
                console.log(this.bureaux);
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });
    }





}
