import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';
import { Vehicule } from 'src/app/model/vehicule.model';
import { VehiculeService } from 'src/app/service/vehicule/vehicule.service';
import { ModalVehComponent } from '../modal_veh/modal-veh/modal-veh.component';

@Component({
    selector: 'tr[app-item-vehicule]',
    templateUrl: './item-vehicule.component.html',
})
export class ItemVehiculeComponent implements OnInit {
    constructor(
        private vehiculeService: VehiculeService,
        private toastr: ToastrService,
        public fb: FormBuilder,
        private modalService: BsModalService) {}
    bsModalRef: BsModalRef;
    @Input() vehicule: Vehicule | null = null;
    @Output() refresh_list_evnt = new EventEmitter<any>();

    editForm: FormGroup;
    deleteVehiculeDialog: boolean = false;
    updatevehDialog: boolean;
    submitted:boolean =false;
    id:any;
    titleModal:any;

    ngOnInit(): void {
        this.editForm = this.fb.group({
            num_imm: ['', [Validators.required]],
            couleur: ['', [Validators.required]],
            marque: ['', [Validators.required]],
            etat: ['', [Validators.required]],
          });
    }

    deletevehicule(vehicule: Vehicule) {
        this.deleteVehiculeDialog = true;
        this.vehicule = {...vehicule};
    }

    confirmDelete(){
        this.deleteVehiculeDialog = false;
        this.vehiculeService.destroy(this.vehicule).subscribe(
            data => {
              this.toastr.info("Donnée supprimer avec succèes !", "Suppression");
              this.refresh_list_evnt.emit();
            }
          );
    }

    openModalveh(){
        const initialState = {
            list: [
              {"operation":'update',"value":"Modification","vehicule":this.vehicule}
            ]
          };
        this.bsModalRef = this.modalService.show(ModalVehComponent,{initialState});
        this.bsModalRef.content.closeBtnName = 'Close';

        this.modalService.onHide.pipe(take(1), filter(reason => reason === 'true')).subscribe((reason: string) => {
            this.refresh_list_evnt.emit();
        })

    }

    get f(): { [key: string]: AbstractControl } {
        return this.editForm.controls;
    }

    getVehicule(id) {
        this.vehiculeService.getVehiculesByID(id).subscribe((data) => {
          this.editForm.setValue({
            num_imm: data['data'].num_imm,
            couleur: data['data'].couleur,
            marque: data['data'].marque,
            etat: data['data'].etat,
          });
        });
    }

}
