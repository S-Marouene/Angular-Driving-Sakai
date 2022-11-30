import { Component, HostListener, OnInit } from '@angular/core';
import {
    CalendarOptions,
    DateSelectArg,
    EventApi,
    EventClickArg,
    EventInput,
} from '@fullcalendar/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import frLocale from '@fullcalendar/core/locales/fr';
import { Conduite } from 'src/app/model/conduite.model';
import { Examen } from 'src/app/model/examen.model';
import { ConduiteService } from 'src/app/service/conduite/conduite.service';
import { ExamenService } from 'src/app/service/examen/examen.service';
import { ModalCalendarComponent } from './modal-calendar/modal-calendar.component';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {
    public innerWidth: any;
    bsModalRef: BsModalRef;
    currentEvents: EventApi[] = [];
    conduites: Conduite[] = [];
    examens: Examen[] = [];
    conduite: Conduite;
    INITIAL_CONDUITES: any = [];
    TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
    myEvents: EventInput[] = [];
    calendarVisible = true;
    Mylist: any;

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
        displayEventTime: false,
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
        eventTimeFormat: {
            hour: 'numeric',
            hour12: false,
            minute: '2-digit',
            meridiem: false,
        },
    };

    constructor(
        private modalService: BsModalService,
        private conduiteService: ConduiteService,
        private examenService: ExamenService
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
        this.conduiteService.GetConduiteAcc().subscribe({
            next: (ListConduite) => {
                this.conduites = ListConduite['data'];
                for (const value of this.conduites) {
                    newEvents.push({
                        start: value.date_deb.toString().replace(' ', 'T'),
                        end: value.date_fin.toString().replace(' ', 'T') || '',
                        title:
                            value.condidat['prenom'] +
                            ' ' +
                            value.condidat['nom'],
                        couleur: value.couleur,
                        photo: value.condidat['photo'],
                        num_tel: value.condidat['num_tel'],
                        color: this.ChargeColorEvent(value.couleur),
                        detail_examen: value.detail_examen,
                        nbr_heur_total: value.nbr_heur_total,
                        nbr_heur_affecter: value.nbr_heur_affecter,
                        nbr_ex: value.nbr_exam,
                        condidat_id: value.condidat_id,
                    });
                }
            },
            error: () => {
                console.log(
                    `Problème au niveau du serveur, attention les données sont fake `
                );
            },
        });

        this.examenService.getExamensCalendar().subscribe({
            next: (ListExamens) => {
                this.examens = ListExamens['data'];
                for (const value of this.examens) {
                    newEvents.push({
                        start: value.date_examen.toString().replace(' ', 'T'),
                        title:
                            value.condidat['prenom'] +
                            ' ' +
                            value.condidat['nom'] +
                            ' Exm ' +
                            value.type_examen,
                        conduite_id: 0,
                        color: '#f39c12',
                        nom_pren:value.condidat['prenom'] +
                        ' ' +
                        value.condidat['nom'],
                        photo: value.condidat['photo'],
                        num_tel: value.condidat['num_tel'],
                        detail_examen: value.detail_examen,
                        nbr_heur_total: value.nbr_heur_total,
                        nbr_heur_affecter: value.nbr_heur_affecter,
                        nbr_ex: value.nbr_exam,
                        condidat_id: value.condidat_id,
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

    handleDateSelect(selectInfo: DateSelectArg) {}

    handleEventClick(clickInfo: EventClickArg) {
        if (clickInfo.event.extendedProps.conduite_id == 0) {
            this.Mylist = {
                operation: 'Examen',
                start: clickInfo.event.startStr,
                end: clickInfo.event.endStr,
                title: clickInfo.event._def.title,
                extendedProps: clickInfo.event.extendedProps,
            };
        } else {
            this.Mylist = {
                operation: 'Fiche Condidat',
                start: clickInfo.event.startStr,
                end: clickInfo.event.endStr,
                title: clickInfo.event._def.title,
                extendedProps: clickInfo.event.extendedProps,
            };
        }

        const initialState = {
            list: [this.Mylist],
        };

        this.bsModalRef = this.modalService.show(ModalCalendarComponent, {
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
