import { Component, Input, OnInit } from '@angular/core';
import { Condidat } from 'src/app/model/condidat.model';
import { CONSTANTES } from 'src/environments/environment';

@Component({
  selector: 'tr[app-item-condidat-archive]',
  templateUrl: './item-condidat-archive.component.html',
  styleUrls: ['./item-condidat-archive.component.css']
})
export class ItemCondidatArchiveComponent implements OnInit {

      URLcondidatPic = CONSTANTES.URLcondidatPic;
      @Input() condidat: Condidat | null = null;

      constructor() { }

      ngOnInit(): void {


      }

    }
