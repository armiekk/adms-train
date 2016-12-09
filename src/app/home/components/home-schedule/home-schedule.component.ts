import { Component, OnInit } from '@angular/core';
import { ThaiCalendarService } from '../../../shared/services/thai-calendar/thai-calendar.service';
declare var moment: any;

export class Event {
    id: number;
    title: string;
    start: string;
    end: Date;
    allDay: boolean = true;
}

@Component({
    selector: 'app-home-schedule',
    templateUrl: './home-schedule.component.html',
    styleUrls: ['./home-schedule.component.css']
})
export class HomeScheduleComponent implements OnInit {

    private events: Event[] = [];
    private event: Event;
    private dialogVisible: boolean = false;

    constructor(private locale: ThaiCalendarService) { }

    ngOnInit() {

    }

    handleDayClick(event) {
        this.event = new Event();
        this.event.start = event.date.format();
        this.dialogVisible = true;

        // trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        // this.cd.detectChanges();
    }

    handleEventClick(e) {
        this.event = new Event();
        this.event.title = e.calEvent.title;

        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }

        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    }

    saveEvent() {
        // update
        if (this.event.id) {
            let index: number = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.events[index] = this.event;
            }
        } else {
            this.event.id = Math.round(Math.random() * 100);
            this.events.push(this.event);
            this.event = null;
        }

        this.dialogVisible = false;
    }

    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }
}
