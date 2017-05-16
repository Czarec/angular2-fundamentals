import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from '../shared/index';

@Component({
    templateUrl: 'app/events/event-details/event-details.component.html',
    styleUrls: [ 'app/events/event-details/event-details.component.scss' ]
})
export class EventDetailsComponent implements OnInit {
    event: IEvent;
    addMode: boolean;
    filterBy: string = 'all';
    sortBy: string = 'name';

    constructor(
        private eventsService: EventService,
        private route: ActivatedRoute
        ) {        
    }

    ngOnInit() {
        this.route.data.forEach(data => {
            this.event = data['event'];
            this.addMode = false; 
        });
    }

    addSession() {
        this.addMode = true;
    }

    saveNewSession(session: ISession) {
        const maxId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = maxId + 1;
        this.event.sessions.push(session);
        this.eventsService.saveEvent(this.event).subscribe();
        this.addMode = false;
    }

    cancelAddSession() {
        this.addMode = false;
    }
}