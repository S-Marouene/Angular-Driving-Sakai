import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Examinateur } from 'src/app/model/examinateur.model';
import { ExaminateurService } from 'src/app/service/examinateur/examinateur.service';

@Component({
  selector: 'app-modal-examinateur',
  templateUrl: './modal-examinateur.component.html'
})
export class ModalExaminateurComponent implements OnInit {

    formaddexaminateur;
    submitted: boolean = false;
    errors: any;
    examinateur: Examinateur;
    titleModal: any;
    list: any[] = [];
    examinateurx: Examinateur[] = [];

  constructor(public fb: FormBuilder,
    private examinateurService: ExaminateurService,
    public router: Router,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formaddexaminateur = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', [Validators.required]],
        adresse: ['', Validators.required],
        telephone: ['', Validators.required],
    });

    this.formaddexaminateur.setValue({
        nom: this.list[0].examinateur?.nom || '',
        prenom: this.list[0].examinateur?.prenom || '',
        adresse: this.list[0].examinateur?.adresse || '',
        telephone: this.list[0].examinateur?.telephone || '',
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formaddexaminateur.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.examinateurService.register(this.formaddexaminateur.value).subscribe(
            (result) => {
            },
            (error) => {
                this.errors = error.error;
            },
            () => {
                this.formaddexaminateur.reset();
                this.bsModalRef.hide();
                this.examinateur = {};
                this.toastr.info('examinateur ajouter avec succée', 'Info');
                this.modalService.setDismissReason("true");
            }
        );
    }

    onUpdate(id: any) {
        this.submitted = true;
        if (this.formaddexaminateur.valid) {
            this.examinateurService
                .update_exam(this.formaddexaminateur.value, id)
                .subscribe(
                    (result) => {
                    },
                    (error) => {
                        this.errors = error.error;
                    },
                    () => {
                        this.formaddexaminateur.reset();
                        this.bsModalRef.hide();
                        this.examinateur = {};
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
