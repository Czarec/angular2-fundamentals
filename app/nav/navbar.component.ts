import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession } from '../events/shared/session.model';
import { EventService } from '../events/shared/event.service';

@Component({
    selector: 'nav-bar',
    templateUrl: 'app/nav/navbar.component.html',
    styleUrls: [ 'app/nav/navbar.component.scss' ]
})
export class NavBarComponent {

    searchTerm: string = "";
    foundSessions: ISession[];

    constructor(private auth : AuthService, private eventService: EventService) {

    }

    searchSessions(searchTerm) {
        this.eventService.searchSessions(searchTerm)
            .subscribe(sessions => {
                this.foundSessions = sessions;
            })
    }
}