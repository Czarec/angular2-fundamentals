import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../shared/event.service';
import { IEvent, ISession } from '../shared/index';

@Component({
    templateUrl: 'app/events/event-details/event-details.component.html',
    styleUrls: [ 'app/events/event-details/event-details.component.scss' ]
})
export class EventDetailsComponent implements OnInit {
    public event: IEvent;
    public addMode: boolean;
    public filterBy: string = 'all';
    public sortBy: string = 'name';

    constructor(
        private eventsService: EventService,
        private route: ActivatedRoute
        ) {        
    }

    public ngOnInit() {
        this.route.data.forEach(data => {
            this.event = data['event'];
            this.addMode = false; 
        });
    }

    public addSession() {
        this.addMode = true;
    }

    public saveNewSession(session: ISession) {
        const maxId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = maxId + 1;
        this.event.sessions.push(session);
        this.eventsService.saveEvent(this.event).subscribe();
        this.addMode = false;
    }

    public cancelAddSession() {
        this.addMode = false;
    }
}