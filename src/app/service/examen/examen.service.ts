import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/api/appconfig';
import { Examen } from 'src/app/model/examen.model';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

    constructor(private http: HttpClient) { }

    getExamens(): Observable<Examen[]> {
        return this.http.get<Examen[]>(API.ListExamen)
    }
    getExamenByCondidat(id): Observable<Examen[]> {
        return this.http.get<Examen[]>(API.getExamenByCondidat + id)
    }


    getExamensByID(id: number): Observable<Examen> {
        return this.http.get<Examen>(API.getExamenByID + id)
    }

    register(Examen): Observable<any> {
        return this.http.post(API.add_Examen, Examen);
    }

    destroy(Examen:any) : Observable<any> {
        return this.http.delete(API.DeleteExamen + Examen.id );
    }

    update_Exam(Examen:any,id:any) : Observable<any> {
        return this.http.put(API.updateExamen + id ,Examen);
    }

    update_result(Examen:any,id:any): Observable<any> {
        return this.http.put(API.updateResultExamen + id ,Examen);
    }
}
