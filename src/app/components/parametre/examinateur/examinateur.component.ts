import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { filter, take } from 'rxjs';
import { Examinateur } from 'src/app/model/examinateur.model';
import { ExaminateurService } from 'src/app/service/examinateur/examinateur.service';
import { ModalExaminateurComponent } from './modal-examinateur/modal-examinateur.component';

@Component({
  selector: 'app-examinateur',
  templateUrl: './examinateur.component.html',
})
export class ExaminateurComponent implements OnInit {
        examinateurs: Examinateur[] = [];
        examinateur: Examinateur;
        loading:boolean;
        bsModalRef: BsModalRef;
        errors: any = null;
        submitted = false;


        constructor(private examinateurService:ExaminateurService,
            private modalService: BsModalService) { }

        ngOnInit(): void {
            this.examinateurService.getExaminateurs().subscribe({
                next: (ListExaminateur) => {
                    this.examinateurs = ListExaminateur['data'];
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
            this.bsModalRef = this.modalService.show(ModalExaminateurComponent, {
                initialState,
            });
            this.bsModalRef.content.closeBtnName = 'Close';
            this.modalService.onHide.pipe(take(1), filter(reason => reason === 'true')).subscribe((reason: string) => {
                this.getListexaminateur();
            })
        }

        getListexaminateur() {
            this.examinateurService.getExaminateurs().subscribe({
                next: (ListExaminateur) => {
                    this.examinateurs = ListExaminateur['data'];
                },
                error: () => {
                    console.log(
                        `Problème au niveau du serveur, attention les données sont fake `
                    );
                },
            });
        }





    }
