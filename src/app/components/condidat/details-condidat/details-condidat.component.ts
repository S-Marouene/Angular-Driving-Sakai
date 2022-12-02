import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { Condidat } from 'src/app/model/condidat.model';
import { CondidatService } from 'src/app/service/condidat/condidat.service';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-details-condidat',
  templateUrl: './details-condidat.component.html'
})
export class DetailsCondidatComponent implements OnInit {
    condidat : Condidat | null=null;
    breadcrumbItems: MenuItem[];
    routeItems: MenuItem[];

    constructor(
        private condidatService :CondidatService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ){}


  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
        this.condidatService.getCondidatsByID(params.id).subscribe({
            next: (condidat) => {
                this.condidat = condidat;
            },
            error: (e) => {this.router.navigate(['condidat']);}
        });
    });



    this.breadcrumbItems = [];
        this.breadcrumbItems.push({ label: 'Liste Condidat' , routerLink:'/condidat'});
        this.breadcrumbItems.push({ label: 'Détails Condidat'});
        /* this.breadcrumbItems.push({ label: 'Notebook' });
        this.breadcrumbItems.push({ label: 'Accessories' });
        this.breadcrumbItems.push({ label: 'Backpacks' });
        this.breadcrumbItems.push({ label: 'Item' }); */
    }
}
