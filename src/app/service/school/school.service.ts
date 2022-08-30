import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/api/appconfig';
import { School } from 'src/app/model/schools.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

    constructor(private http: HttpClient) { }

    add(school): Observable<any> {
      return this.http.post(API.add_school, school);
    }

    getAllSchool() :Observable<School[]>{
        return this.http.get<School[]>(API.ListSchool)
    }

    deleteSchoolService(school:any)
    {
      return this.http.delete(API.DeleteSchool+school.id);
    }




}
