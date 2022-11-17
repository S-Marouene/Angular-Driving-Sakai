import { Component, Input, OnInit } from '@angular/core';
import { Condidat } from 'src/app/model/condidat.model';
import { CONSTANTES } from 'src/environments/environment';

@Component({
  selector: 'tr[app-item-condidat]',
  templateUrl: './item-condidat.component.html',
})
export class ItemCondidatComponent implements OnInit {
  URLcondidatPic = CONSTANTES.URLcondidatPic;
  @Input() condidat: Condidat | null = null;

  constructor() { }

  ngOnInit(): void {


  }

}
