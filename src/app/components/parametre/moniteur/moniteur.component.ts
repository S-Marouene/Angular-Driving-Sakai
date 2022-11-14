import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { filter, take } from 'rxjs';
import { Moniteur } from 'src/app/model/moniteur.model';
import { MoniteurService } from 'src/app/service/moniteur/moniteur.service';
import { ModelMoniteurComponent } from './modal-moniteur/modal-moniteur.component';

@Component({
  selector: 'app-moniteur',
  templateUrl: './moniteur.component.html',
})
export class MoniteurComponent implements OnInit {
        moniteurs: Moniteur[] = [];
        moniteur: Moniteur;
        loading:boolean;
        bsModalRef: BsModalRef;
        errors: any = null;
        submitted = false;
        constructor(private moniteurService:MoniteurService,
            private modalService: BsModalService) { }

        ngOnInit(): void {
            this.moniteurService.getMoniteurs().subscribe({
                next: (ListBureau) => {
                    this.moniteurs = ListBureau['data'];
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
            this.bsModalRef = this.modalService.show(ModelMoniteurComponent, {
                initialState,
            });
            this.bsModalRef.content.closeBtnName = 'Close';
            this.modalService.onHide.pipe(take(1), filter(reason => reason === 'true')).subscribe((reason: string) => {
                this.getListmoniteur();
            })
        }

        getListmoniteur() {
            this.moniteurService.getMoniteurs().subscribe({
                next: (ListBureau) => {
                    this.moniteurs = ListBureau['data'];
                },
                error: () => {
                    console.log(
                        `Problème au niveau du serveur, attention les données sont fake `
                    );
                },
            });
        }

    }
