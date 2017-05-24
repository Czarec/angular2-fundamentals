import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './shared/event.service';

@Component({
    selector: 'events-list',
    templateUrl: 'app/events/events-list.component.html'
})
export class EventsListComponent implements OnInit {
    public events: any;

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute) {             
    }

    public ngOnInit() {
        
        this.events = this.route.snapshot.data['events'];
    }
}