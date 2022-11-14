import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { Condidat } from 'src/app/model/condidat.model';
import { CondidatService } from 'src/app/service/condidat/condidat.service';

@Component({
  selector: 'app-details-condidat',
  templateUrl: './details-condidat.component.html'
})
export class DetailsCondidatComponent implements OnInit {
    condidat : Condidat | null=null;

    constructor(
        private condidatService :CondidatService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ){}

    fnt(e){
        var index = e.index;
        if( index == 1){

        }
       /*  setTimeout(() => {

        }, 1500); */
        if( index == 2){


        }

    }
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
        this.condidatService.getCondidatsByID(params.id).subscribe({
            next: (condidat) => {
                this.condidat = condidat;
            },
            error: (e) => {this.router.navigate(['condidat']);}
        });
    });
  }
}
