import { Component, Input, OnInit } from '@angular/core';
import { Bureau } from 'src/app/model/bureau.model';

@Component({
  selector: 'tr[app-item-bureau]',
  templateUrl: './item-bureau.component.html'
})
export class ItemBureauComponent implements OnInit {
  @Input() bureau: Bureau | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
