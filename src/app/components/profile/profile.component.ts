import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CONSTANTES } from 'src/app/constantes/constantes';
import { User } from 'src/app/model/users.model';
import { UserService } from 'src/app/service/users.service';
import { AuthService } from 'src/app/shared-auth/auth.service';
import { CountryService } from '../../service/countryservice';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./style_profile.component.scss']
})
export class ProfileComponent implements OnInit {

    countries: any[];

    cities: any[];

    filteredCountries: any[];

    value1: any;

    value2: any;

    value3: any;

    value4: any;

    value5: any;

    value6: any;

    value7: any;

    value8: any;

    value9: any;

    value10: any;

    value11: any;

    value12: any;


    errors: any = null;
    UserProfile!: User;
    URLprofilePic=CONSTANTES.URLprofilePic;
    imageSrc: string = '';
    files:any;
    form_change_profile_picture: FormGroup = new FormGroup({});
    defaultProfileUser=CONSTANTES.defaultImage;
    param1="1";

    constructor(private countryService: CountryService,
        public authService: AuthService,
        public userService:UserService) {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }

    ngOnInit() {
        this.authService.profileUser().subscribe((data: any) => {
            this.UserProfile = data;
            this.imageSrc=this.URLprofilePic + (this.UserProfile.path || this.defaultProfileUser )  ;
        });

        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });
    }

    onFileChange(event:any) {
        const reader = new FileReader();

        if(event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.imageSrc = reader.result as string;
            this.form_change_profile_picture.patchValue({
              fileSource: reader.result
            });
          };
        }
        this.files = event.target.files[0]

        const formData = new FormData();
        formData.append('fileSource', this.files,this.files.name);
        formData.append('path',this.files.name);
        formData.append('param1', this.param1);

        this.userService.updateUserPhoto(formData).subscribe(
            (result) => {
              console.log(result);
            },
            (error) => {
              this.errors = error.error;
            },
            () => {
                this.form_change_profile_picture.reset();
            }
          );
    }

    searchCountry(event) {
        // in a real application, make a request to a remote url with the query and
        // return filtered results, for demo we filter at client side
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}
