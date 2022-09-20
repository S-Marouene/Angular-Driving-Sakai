import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-condidat',
  templateUrl: './condidat.component.html',

})
export class CondidatComponent implements OnInit {




    

    /* public categories: any = ['B', 'A', 'A1', 'C', 'D', 'B+E', 'C+E', 'D+E', 'H'];
    public bureaux: any = ['Menzel temime', 'Nabeul', 'Kélibiya', 'Autres...'];
    valExamen: string;
    valTypeContrat:string;
    valTContratCond:string;
    valPieceFournie: string[] = [];
    selectedDatenaiss:any;
    selectedDateAvSys:any;
    submitted = false;
    form: FormGroup = new FormGroup({});
    imageSrc: string = '';
    files:any; */

    ngOnInit() {

    }

   /*  onFileChange(event:any) {
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
    } */
}
