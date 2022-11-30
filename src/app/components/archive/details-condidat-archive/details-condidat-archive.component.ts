import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Condidat } from 'src/app/model/condidat.model';
import { CondidatService } from 'src/app/service/condidat/condidat.service';

@Component({
  selector: 'app-details-condidat-archive',
  templateUrl: './details-condidat-archive.component.html',
  styleUrls: ['./details-condidat-archive.component.css']
})
export class DetailsCondidatArchiveComponent implements OnInit {

        condidat : Condidat | null=null;
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
      }
    }
