import { Component, OnInit } from '@angular/core';
import { Condidat } from 'src/app/model/condidat.model';
import { CondidatService } from 'src/app/service/condidat/condidat.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html'
})
export class ArchiveComponent implements OnInit {
        condidats: Condidat[] = [];
        condidat: Condidat;
        constructor(
            private condidatservice:CondidatService){
            }
        ngOnInit() {
            this.condidatservice.getCondidatsArchive().subscribe({
                next: (ListCondidat) => {
                    this.condidats = ListCondidat;

                },
                error: () => {
                    console.log(
                        `Problème au niveau du serveur, attention les données sont fake `
                    );
                },
            });
        }
    }
