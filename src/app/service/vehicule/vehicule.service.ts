import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/api/appconfig';
import { Vehicule } from 'src/app/model/vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

    constructor(private http: HttpClient) { }

    getVehicules(): Observable<Vehicule[]> {
        return this.http.get<Vehicule[]>(API.Listvehicule)
    }

    getVehiculesByID(id: number): Observable<Vehicule> {
        return this.http.get<Vehicule>(API.getvehiculeByID + id)
    }

    register(Vehicule): Observable<any> {
        return this.http.post(API.add_vehicule, Vehicule);
    }

    destroy(Vehicule:any) : Observable<any> {
        return this.http.delete(API.Deletevehicule + Vehicule.id );
    }

    update_veh(Vehicule:any,id:any) : Observable<any> {
        return this.http.put(API.updatevehicule + id ,Vehicule);
    }

}


