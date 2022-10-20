import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Caisse } from 'src/app/model/caisse.model';
import { CaisseService } from 'src/app/service/caisse/caisse.service';

@Component({
  selector: 'app-modal-caisse',
  templateUrl: './modal-caisse.component.html'
})
export class ModalCaisseComponent implements OnInit {

    formaddcaisse;
    submitted: boolean = false;
    errors: any;
    caisse: Caisse;
    titleModal: any;
    list: any[] = [];
    caisses: Caisse[] = [];

  constructor(public fb: FormBuilder,
    private caisseService: CaisseService,
    public router: Router,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formaddcaisse = this.fb.group({
        caisse: ['', Validators.required],

    });

    this.formaddcaisse.setValue({
        caisse: this.list[0].caisse?.caisse || '',
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formaddcaisse.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.caisseService.register(this.formaddcaisse.value).subscribe(
            (result) => {
            },
            (error) => {
                this.errors = error.error;
            },
            () => {
                this.formaddcaisse.reset();
                this.bsModalRef.hide();
                this.caisse = {};
                this.toastr.info('caisse ajouter avec succée', 'Info');
                this.modalService.setDismissReason("true");
            }
        );
    }

    onUpdate(id: any) {
        this.submitted = true;
        if (this.formaddcaisse.valid) {
            this.caisseService
                .update_caisse(this.formaddcaisse.value, id)
                .subscribe(
                    (result) => {
                    },
                    (error) => {
                        this.errors = error.error;
                    },
                    () => {
                        this.formaddcaisse.reset();
                        this.bsModalRef.hide();
                        this.caisse = {};
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
