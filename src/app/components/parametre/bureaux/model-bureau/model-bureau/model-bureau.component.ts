import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Bureau } from 'src/app/model/bureau.model';
import { BureauService } from 'src/app/service/bureau/bureau.service';

@Component({
  selector: 'app-model-bureau',
  templateUrl: './model-bureau.component.html'
})
export class ModelBureauComponent implements OnInit {
    formaddbureau;
    submitted: boolean = false;
    errors: any;
    bureau: Bureau;
    titleModal: any;
    list: any[] = [];
    bureaux: Bureau[] = [];

  constructor(public fb: FormBuilder,
    private bureauService: BureauService,
    public router: Router,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formaddbureau = this.fb.group({
        nom: ['', Validators.required],
        sequence: ['', [Validators.required]],
        mat_fiscal: ['', [Validators.required]],
        adresse: ['', Validators.required],
        nom_comercial: ['', Validators.required],
    });

    this.formaddbureau.setValue({
        nom: this.list[0].bureau?.nom || '',
        sequence: this.list[0].bureau?.sequence || '',
        mat_fiscal: this.list[0].bureau?.mat_fiscal || '',
        adresse: this.list[0].bureau?.adresse || '',
        nom_comercial: this.list[0].bureau?.nom_comercial || '',
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formaddbureau.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.bureauService.register(this.formaddbureau.value).subscribe(
            (result) => {
            },
            (error) => {
                this.errors = error.error;
            },
            () => {
                this.formaddbureau.reset();
                this.bsModalRef.hide();
                this.bureau = {};
                this.toastr.info('bureau ajouter avec succée', 'Info');
                this.modalService.setDismissReason("true");
            }
        );
    }

    onUpdate(id: any) {
        this.submitted = true;
        if (this.formaddbureau.valid) {
            this.bureauService
                .update_Bur(this.formaddbureau.value, id)
                .subscribe(
                    (result) => {
                    },
                    (error) => {
                        this.errors = error.error;
                    },
                    () => {
                        this.formaddbureau.reset();
                        this.bsModalRef.hide();
                        this.bureau = {};
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
