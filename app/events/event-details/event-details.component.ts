import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'app/events/event-details/event-details.component.html',
    styleUrls: [ 'app/events/event-details/event-details.component.scss' ]
})
export class EventDetailsComponent implements OnInit {
    event: any;

    constructor(
        private eventsService: EventService,
        private route: ActivatedRoute
        ) {        
    }

    ngOnInit() {
        this.event = this.eventsService.getEvent(+this.route.snapshot.params['id']);
    }

}