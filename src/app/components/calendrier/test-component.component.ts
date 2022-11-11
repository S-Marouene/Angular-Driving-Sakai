import { Component, HostListener, OnInit } from '@angular/core';
import {
    CalendarOptions,
    DateSelectArg,
    EventClickArg,
    EventApi,
    EventInput,
} from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import frLocale from '@fullcalendar/core/locales/fr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalAddConduiteComponent } from './modal-add-conduite/modal-add-conduite.component';
import { ConduiteService } from 'src/app/service/conduite/conduite.service';
import { Conduite } from 'src/app/model/conduite.model';

@Component({
    selector: 'app-test-component',
    templateUrl: './test-component.component.html',
    styleUrls: ['./test-component.component.scss'],
})
export class TestComponentComponent {
    public innerWidth: any;
    bsModalRef: BsModalRef;
    currentEvents: EventApi[] = [];
    conduites: Conduite[] = [];
    conduite:Conduite;
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
        height: 550,
        allDaySlot: false,
        locales: [frLocale],
        initialView: 'timeGridWeek',
        weekends: true,
        editable: false,
        selectable: true,
        selectMirror: false,
        dayMaxEvents: false,
        //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this),
        longPressDelay: 1,
        slotMinTime: '06:00:00',
        slotMaxTime: '22:00:00',
        titleFormat: {
            month: '2-digit',
            year: '2-digit',
            day: '2-digit',
            weekday: 'short',
        },
        eventTimeFormat: { // like '14:30:00'
            hour: 'numeric',
            hour12: false,
            minute: '2-digit',
            meridiem: false,
          }
    };

    constructor(
        private modalService: BsModalService,
        private conduiteService: ConduiteService
    ) {}

    ngOnInit() {
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
        this.conduiteService.getConduites().subscribe({
            next: (ListConduite) => {
                this.conduites = ListConduite['data'];
                for (const value of this.conduites) {
                    newEvents.push({
                        start: value.date_deb.toString().replace(' ', 'T'),
                        end: value.date_fin.toString().replace(' ', 'T') || '',
                        allDay: false,
                        title: value.condidat_prenom +' '+value.condidat_nom,
                        conduite_id:value.id,
                        conduite_moniteur:value.moniteur,
                        conduite_vehicule:value.vehicule,
                        nbr_heure:value.nbr_heure
                        //color: value.color
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

        setTimeout(() => {
            this.calendarOptions = {
                ...this.calendarOptions,
                events: this.myEvents,
            };
        }, 2500);
    }

    handleCalendarToggle() {
        this.calendarVisible = !this.calendarVisible;
    }

    handleWeekendsToggle() {
        const { calendarOptions } = this;
        calendarOptions.weekends = !calendarOptions.weekends;
    }

    handleDateSelect(selectInfo: DateSelectArg) {
        const initialState = {
            list: [
                {
                    operation: 'Ajout',
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    selectInfo:selectInfo,
                    nbr_heure:'2'
                },
            ],
        };
        this.bsModalRef = this.modalService.show(ModalAddConduiteComponent, {
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
                    moniteur:clickInfo.event.extendedProps.conduite_moniteur,
                    vehicule:clickInfo.event.extendedProps.conduite_vehicule,
                    nbr_heure:clickInfo.event.extendedProps.nbr_heure,
                    clickInfo:clickInfo
                },
            ],
        };
        this.bsModalRef = this.modalService.show(ModalAddConduiteComponent, {
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
