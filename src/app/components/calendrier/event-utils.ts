import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'Mohamed',
    //start: TODAY_STR,
    start: TODAY_STR + 'T08:00:00',
    end: TODAY_STR + 'T10:00:00',
    color: 'red',     // an option!
    textColor: 'yellow' // an option!
  },
  {
    id: createEventId(),
    title: 'Ali',
    start: TODAY_STR + 'T10:00:00',
    end: TODAY_STR + 'T12:00:00',
    color: 'yellow',     // an option!
    textColor: 'red' // an option!
  },
  {
    id: createEventId(),
    title: 'Salah',
    start: TODAY_STR + 'T14:00:00',
    end: TODAY_STR + 'T15:00:00'
  }
];



export function createEventId() {
  return String(eventGuid++);
}
