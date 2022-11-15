import { DatePipe, getLocaleFirstDayOfWeek, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { Customer, Representative } from 'src/app/api/customer';
import { Product } from 'src/app/api/product';
import { CONSTANTES } from 'src/app/constantes/constantes';
import { Condidat } from 'src/app/model/condidat.model';
import { CondidatService } from 'src/app/service/condidat/condidat.service';
import { CustomerService } from 'src/app/service/customerservice';
import { ProductService } from 'src/app/service/productservice';

@Component({
  selector: 'app-condidat',
  templateUrl: './condidat.component.html',

})
export class CondidatComponent implements OnInit {
    condidats: Condidat[] = [];
    condidat: Condidat;

    constructor(private customerService: CustomerService,
        private condidatservice:CondidatService){
        }

    ngOnInit() {

        this.condidatservice.getCondidats().subscribe({
            next: (ListCondidat) => {
                this.condidats = ListCondidat;
                console.log(ListCondidat[0]);

            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });
    }
}
