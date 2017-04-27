import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ISession } from '../shared/index';

@Component({
    templateUrl: 'app/events/event-details/event-details.component.html',
    styleUrls: [ 'app/events/event-details/event-details.component.scss' ]
})
export class EventDetailsComponent implements OnInit {
    event: IEvent;
    addMode: boolean;

    constructor(
        private eventsService: EventService,
        private route: ActivatedRoute
        ) {        
    }

    ngOnInit() {
        this.event = this.eventsService.getEvent(+this.route.snapshot.params['id']);
    }

    addSession() {
        this.addMode = true;
    }

    saveNewSession(session: ISession) {
        const maxId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = maxId + 1;
        this.event.sessions.push(session);
        this.eventsService.updateEvent(this.event);
        this.addMode = false;
    }

    cancelAddSession() {
        this.addMode = false;
    }
}