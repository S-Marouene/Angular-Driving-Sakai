import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/api/appconfig';
import { CentreExam } from 'src/app/model/centre-exam.model';

@Injectable({
  providedIn: 'root'
})
export class CentreExamService {

    constructor(private http: HttpClient) { }

    getCentreExams(): Observable<CentreExam[]> {
        return this.http.get<CentreExam[]>(API.Listcentre_exam)
    }

    getCentreExamsByID(id: number): Observable<CentreExam> {
        return this.http.get<CentreExam>(API.getcentre_examByID + id)
    }

    register(CentreExam): Observable<any> {
        return this.http.post(API.add_centre_exam, CentreExam);
    }

    destroy(CentreExam:any) : Observable<any> {
        return this.http.delete(API.Deletecentre_exam + CentreExam.id );
    }

    update_cex(CentreExam:any,id:any) : Observable<any> {
        return this.http.put(API.updatecentre_exam + id ,CentreExam);
    }
}
