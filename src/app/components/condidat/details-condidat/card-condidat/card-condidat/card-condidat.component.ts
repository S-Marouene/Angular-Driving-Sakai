import { Component, Input, OnInit } from '@angular/core';
import { CONSTANTES } from 'src/app/constantes/constantes';
import { Condidat } from 'src/app/model/condidat.model';

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
