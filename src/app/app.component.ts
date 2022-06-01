import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    menuMode = 'static';

    constructor(private primengConfig: PrimeNGConfig) { }

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth'
      };

    ngOnInit() {
        this.primengConfig.ripple = true;
        document.documentElement.style.fontSize = '14px';
    }
}
