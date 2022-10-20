import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { filter, take } from 'rxjs';
import { Caisse } from 'src/app/model/caisse.model';
import { CaisseService } from 'src/app/service/caisse/caisse.service';
import { ModalCaisseComponent } from './modal-caisse/modal-caisse.component';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
})
export class CaisseComponent implements OnInit {
    caisses: Caisse[] = [];
    caisse: Caisse;
    loading:boolean;
    bsModalRef: BsModalRef;
    errors: any = null;
    submitted = false;


    constructor(private caisseService:CaisseService,
        private modalService: BsModalService) { }

    ngOnInit(): void {
        this.caisseService.getCaisses().subscribe({
            next: (ListCaisse) => {
                this.caisses = ListCaisse['data'];
                console.log(this.caisses);
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
        this.bsModalRef = this.modalService.show(ModalCaisseComponent, {
            initialState,
        });
        this.bsModalRef.content.closeBtnName = 'Close';
        this.modalService.onHide.pipe(take(1), filter(reason => reason === 'true')).subscribe((reason: string) => {
            this.getListcaisse();
        })
    }

    getListcaisse() {
        this.caisseService.getCaisses().subscribe({
            next: (ListCaisse) => {
                this.caisses = ListCaisse['data'];
                console.log(this.caisses);
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });
    }





}
