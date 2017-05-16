import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './shared/event.service';

@Component({    
    templateUrl: 'app/events/create-event.component.html',
    styleUrls: ['app/events/create-event.component.scss']
})
export class CreateEventComponent {

    isDirty: boolean = true;

    constructor(private router: Router, private eventService: EventService) {
    }

    saveEvent(formValues) {
       this.eventService.saveEvent(formValues).subscribe(evt => {
            this.isDirty = false;
            this.router.navigate(['/events']);
       });        
    }

    cancel() {
        this.router.navigate(['/events']);
    }

}