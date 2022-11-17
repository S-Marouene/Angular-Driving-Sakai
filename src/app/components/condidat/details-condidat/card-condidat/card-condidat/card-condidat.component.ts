import { Component, Input, OnInit } from '@angular/core';

import { Condidat } from 'src/app/model/condidat.model';
import { CONSTANTES } from 'src/environments/environment';

@Component({
  selector: 'app-card-condidat',
  templateUrl: './card-condidat.component.html'
})
export class CardCondidatComponent implements OnInit {
  @Input() condidat:Condidat;
  URLcondidatPic = CONSTANTES.URLcondidatPic;
  constructor() { }

  ngOnInit(): void {
  }

}
