import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/api/appconfig';
import { Code } from 'src/app/model/code.model';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

    constructor(private http: HttpClient) { }

    getCodes(): Observable<Code[]> {
        return this.http.get<Code[]>(API.Listcode)
    }

    getCodesByID(id: number): Observable<Code> {
        return this.http.get<Code>(API.getcodeByID + id)
    }

    register(Code): Observable<any> {
        return this.http.post(API.add_code, Code);
    }

    destroy(Code:any) : Observable<any> {
        return this.http.delete(API.Deletecode + Code.id );
    }

    update_code(Code:any,id:any) : Observable<any> {
        return this.http.put(API.updatecode + id ,Code);
    }

}


