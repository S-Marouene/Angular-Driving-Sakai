import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Condidat } from 'src/app/model/condidat.model';
import { CONSTANTES } from 'src/environments/environment';

@Component({
  selector: 'app-card-condidat',
  templateUrl: './card-condidat.component.html',
  styleUrls: ['./style.css'],
})
export class CardCondidatComponent implements OnInit {
  @Input() condidat:Condidat;
  URLcondidatPic = CONSTANTES.URLcondidatPic;
  nb_heur_affecter:any;
  nb_heur_total:any;

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    setTimeout(() => {
        this.nb_heur_affecter=this.condidat.nbr_heur_affecter[0]?.nb_heur_affecter || '_'
        this.nb_heur_total=this.condidat.nbr_heur_total[0]?.nb_heur_total || '_'
    }, 2000);
  }
}
