import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Moniteur } from 'src/app/model/moniteur.model';
import { MoniteurService } from 'src/app/service/moniteur/moniteur.service';

@Component({
  selector: 'app-modal-moniteur',
  templateUrl: './modal-moniteur.component.html'
})
export class ModelMoniteurComponent implements OnInit {
    formaddmoniteur;
    submitted: boolean = false;
    errors: any;
    moniteur: Moniteur;
    titleModal: any;
    list: any[] = [];
    moniteurs: Moniteur[] = [];
    loading:any;

  constructor(public fb: FormBuilder,
    private moniteurService: MoniteurService,
    public router: Router,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formaddmoniteur = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
        adresse: ['', Validators.required],
        formation: ['', Validators.required],
        prix_conduite: ['', Validators.required],
    });

    this.formaddmoniteur.setValue({
        nom: this.list[0].moniteur?.nom || '',
        prenom: this.list[0].moniteur?.prenom || '',
        telephone: this.list[0].moniteur?.telephone || '',
        adresse: this.list[0].moniteur?.adresse || '',
        formation: this.list[0].moniteur?.formation || '',
        prix_conduite: this.list[0].moniteur?.prix_conduite || '',
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formaddmoniteur.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.moniteurService.register(this.formaddmoniteur.value).subscribe(
            (result) => {
            },
            (error) => {
                this.errors = error.error;
            },
            () => {
                this.formaddmoniteur.reset();
                this.bsModalRef.hide();
                this.moniteur = {};
                this.toastr.info('moniteur ajouter avec succée', 'Info');
                this.modalService.setDismissReason("true");
            }
        );
    }

    onUpdate(id: any) {
        this.submitted = true;
        if (this.formaddmoniteur.valid) {
            this.moniteurService
                .update_mon(this.formaddmoniteur.value, id)
                .subscribe(
                    (result) => {
                    },
                    (error) => {
                        this.errors = error.error;
                    },
                    () => {
                        this.formaddmoniteur.reset();
                        this.bsModalRef.hide();
                        this.moniteur = {};
                        this.toastr.info('Donnée Modifier avec succée', 'Info');
                        this.modalService.setDismissReason("true");
                    }
                );
        }
    }

    hideDialog() {
        this.bsModalRef.hide();
        this.submitted = false;
    }

}
