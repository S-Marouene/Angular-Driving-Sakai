import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Bureau } from 'src/app/model/bureau.model';
import { BureauService } from 'src/app/service/bureau/bureau.service';

@Component({
  selector: 'app-bureaux',
  templateUrl: './bureaux.component.html',
})
export class BureauxComponent implements OnInit {
    bureaux: Bureau[] = [];
    bureau: Bureau;
    loading:boolean;
    constructor(private bureauService:BureauService) { }


    errors: any = null;
    VehiculeDialog: boolean;
    formaddvehicule: FormGroup = new FormGroup({});
    updateUserDialog:boolean;
    deleteUserDialog: boolean = false;
    submitted = false;



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

    openNew() {
        //this.vehicule = {};
        this.submitted = false;
        this.VehiculeDialog = true;
    }

    hideDialog() {
        //this.UserDialog = false;
        this.updateUserDialog =false;
        this.submitted = false;
    }

}
