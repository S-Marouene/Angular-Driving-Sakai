import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environments/environment';
import { Paiement } from 'src/app/model/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

    constructor(private http: HttpClient) { }

    getPaiements(): Observable<Paiement[]> {
        return this.http.get<Paiement[]>(API.Listpaiement)
    }

    getPaiementsByID(id: number): Observable<Paiement> {
        return this.http.get<Paiement>(API.getpaiementByID + id)
    }

    getpaiementByCondidat(id: any): Observable<Paiement> {
        return this.http.get<Paiement>(API.getpaiementByCondidat + id)
    }


    register(Paiement): Observable<any> {
        return this.http.post(API.add_paiement, Paiement);
    }

    destroy(Paiement:any) : Observable<any> {
        return this.http.delete(API.Deletepaiement + Paiement.id );
    }

    update_paiement(Paiement:any,id:any) : Observable<any> {
        return this.http.put(API.updatepaiement + id ,Paiement);
    }

}


