import { Component, OnInit } from '@angular/core';
import { Vehicule } from 'src/app/model/vehicule.model';
import { VehiculeService } from 'src/app/service/vehicule/vehicule.service';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html'
})
export class VehiculeComponent implements OnInit {
  constructor(private vehiculeService:VehiculeService) { }
  vehicules: Vehicule[] = [];
  vehicule: Vehicule;

  ngOnInit(): void {
    this.vehiculeService.getVehicules().subscribe({
        next: (ListVehicule) => {
            this.vehicules = ListVehicule['data'];
        },
        error: () => {
            console.log(
                `Problème au niveau du serveur, attention les données sont fake `
            );
        },
    });
  }

}
