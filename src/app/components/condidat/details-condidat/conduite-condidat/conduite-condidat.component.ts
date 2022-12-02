import {
    Component,
    HostListener,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    CalendarOptions,
    DateSelectArg,
    EventApi,
    EventClickArg,
    EventInput,
    FullCalendarComponent,
} from '@fullcalendar/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Conduite } from 'src/app/model/conduite.model';
import frLocale from '@fullcalendar/core/locales/fr';
import { ConduiteService } from 'src/app/service/conduite/conduite.service';
import { Condidat } from 'src/app/model/condidat.model';
import { ActivatedRoute } from '@angular/router';
import { ModalAddCondCondidatComponent } from './modal-add-cond-condidat/modal-add-cond-condidat.component';

@Component({
    selector: 'app-conduite-condidat',
    templateUrl: './conduite-condidat.component.html',
    styleUrls: ['./conduite-condidat.component.scss'],
})
export class ConduiteCondidatComponent implements OnInit {
    @Input() condidat: Condidat;
    public innerWidth: any;
    bsModalRef: BsModalRef;
    currentEvents: EventApi[] = [];
    conduites: Conduite[] = [];
    conduite: Conduite;
    INITIAL_CONDUITES: any = [];
    TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
    myEvents: EventInput[] = [];
    calendarVisible = true;
    calendarOptions: CalendarOptions = {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'listWeek dayGridMonth,timeGridWeek,timeGridDay',
        },
        height: 650,
        allDaySlot: false,
        locales: [frLocale],
        initialView: 'timeGridWeek',
        weekends: true,
        editable: false,
        selectable: true,
        selectMirror: false,
        dayMaxEvents: false,
        displayEventTime: true,
        //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this),
        longPressDelay: 1,
        slotMinTime: '06:00:00',
        slotMaxTime: '22:00:00',
       /*  titleFormat: {
            month: '2-digit',
            year: '2-digit',
            day: '2-digit',
            weekday: 'short',
        },
 */
        /* eventTimeFormat: {
            // like '14:30:00'
            hour: 'numeric',
            hour12: false,
            minute: '2-digit',
            meridiem: false,
        }, */
    };

    constructor(
        private modalService: BsModalService,
        private conduiteService: ConduiteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.condidat = {};
        this.innerWidth = window.innerWidth;
        if (this.innerWidth < 450) {
            this.calendarOptions = {
                ...this.calendarOptions,
                headerToolbar: {
                    left: 'prev,next',
                    right: 'listWeek dayGridMonth,timeGridWeek,timeGridDay',
                },
                initialView: 'listWeek',
            };
        }

        const newEvents = [];
        this.activatedRoute.params.subscribe((params) => {
            this.conduiteService.getConduitesCondidat(params.id).subscribe({
                next: (ListConduite) => {
                    this.conduites = ListConduite['data'];
                    for (const value of this.conduites) {
                        newEvents.push({
                            start: value.date_deb.toString().replace(' ', 'T'),
                            end:
                                value.date_fin.toString().replace(' ', 'T') ||
                                '',
                            allDay: false,
                            title: value.condidat['prenom'] + ' ' + value.condidat['nom'],
                            conduite_id: value.id,
                            conduite_moniteur: value.moniteur,
                            conduite_vehicule: value.vehicule,
                            nbr_heure: value.nbr_heure,
                            couleur: value.couleur,
                            photo:value.condidat['photo'],
                            color: this.ChargeColorEvent(value.couleur),
                        });
                    }
                    this.myEvents = newEvents;
                },
                error: () => {
                    console.log(
                        `Problème au niveau du serveur, attention les données sont fake `
                    );
                },
            });
        });

        setTimeout(() => {
            this.calendarOptions = {
                ...this.calendarOptions,
                events: this.myEvents,
            };
        }, 1500);
    }

    ChargeColorEvent(color: string) {
        switch (color) {
            case 'Rouge':
                return 'rgb(193 61 61)';
                break;
            case 'Bleu':
                return '#4244cc';
                break;
            case 'Vert':
                return '#26a771';
                break;
            case 'Jaune':
                return 'rgb(175 186 31)';
                break;
            case 'Noir':
                return '#212121';
                break;
            case 'Blanc':
                return '#E0E0E0';
                break;

            default:
                return '#888afa';

                break;
        }
    }

    handleCalendarToggle() {
        this.calendarVisible = !this.calendarVisible;
    }

    handleWeekendsToggle() {
        const { calendarOptions } = this;
        calendarOptions.weekends = !calendarOptions.weekends;
    }

    handleDateSelect(selectInfo: DateSelectArg) {
        console.log(this.condidat);

        const initialState = {
            list: [
                {
                    operation: 'Ajout',
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    selectInfo: selectInfo,
                    nbr_heure: '2',
                    condidat_id: this.condidat.id ,
                    condidat_nom: this.condidat.nom ,
                    condidat_prenom: this.condidat.prenom ,
                    photo: this.condidat.photo ,
                },
            ],
        };
        this.bsModalRef = this.modalService.show(ModalAddCondCondidatComponent, {
            initialState,
        });
        this.bsModalRef.content.closeBtnName = 'Close';
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect(); // clear date selection
    }

    handleEventClick(clickInfo: EventClickArg) {
        const initialState = {
            list: [
                {
                    operation: 'Update',
                    start: clickInfo.event.startStr,
                    end: clickInfo.event.endStr,
                    title: clickInfo.event._def.title,
                    moniteur: clickInfo.event.extendedProps.conduite_moniteur,
                    vehicule: clickInfo.event.extendedProps.conduite_vehicule,
                    nbr_heure: clickInfo.event.extendedProps.nbr_heure,
                    clickInfo: clickInfo,
                    couleur: clickInfo.event.extendedProps.couleur,
                    photo: clickInfo.event.extendedProps.photo,
                },
            ],
        };
        this.bsModalRef = this.modalService.show(ModalAddCondCondidatComponent, {
            initialState,
        });
        this.bsModalRef.content.closeBtnName = 'Close';
    }

    handleEvents(events: EventApi[]) {
        this.currentEvents = events;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
        if (this.innerWidth < 450) {
            this.calendarOptions = {
                ...this.calendarOptions,
                headerToolbar: {
                    left: 'prev,next',
                    right: 'listWeek dayGridMonth,timeGridWeek,timeGridDay',
                },
                initialView: 'listWeek',
            };
        }
        if (this.innerWidth >= 450) {
            this.calendarOptions = {
                ...this.calendarOptions,
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'listWeek dayGridMonth,timeGridWeek,timeGridDay',
                },
                initialView: 'listWeek',
            };
        }
    }
}
