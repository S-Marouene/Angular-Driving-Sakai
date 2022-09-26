import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Condidat } from 'src/app/model/condidat.model';

@Component({
  selector: 'app-renseingement-condidat',
  templateUrl: './renseingement-condidat.component.html'
})
export class RenseingementCondidatComponent implements OnInit {
  @Input() condidat:Condidat;
  constructor() { }
  public categories: any = ['B', 'A', 'A1', 'C', 'D', 'B+E', 'C+E', 'D+E', 'H'];
  public bureaux: any = ['Menzel temime', 'Nabeul', 'Kélibiya', 'Autres...'];
  valExamen: string;
  valTypeContrat:string;
  valTContratCond:string;
  valPieceFournie: string;
  selectedDatenaiss:any;
  selectedDateAvSys:any;
  submitted = false;
  form: FormGroup = new FormGroup({});
  imageSrc: string = '';
  files:any;
  piece_fournit :string;
  selectedpiece_fournit: string[];

  ngOnChanges():void{
    this.piece_fournit=this.condidat?.piece_fournit;
    if(this.piece_fournit === null || this.piece_fournit === undefined){
        this.piece_fournit='';
    }else{
        this.selectedpiece_fournit = this.piece_fournit.split(',');
    }
    console.log(this.condidat);

  }

  ngOnInit(): void {
    this.condidat = {};
  }

  onFileChange(event:any) {
      const reader = new FileReader();
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.form.patchValue({
            fileSource: reader.result
          });
        };
      }
      this.files = event.target.files[0]
  }
  get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
  }

}
