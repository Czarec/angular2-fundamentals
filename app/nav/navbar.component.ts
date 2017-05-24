import { Component } from '@angular/core';
import { EventService } from '../events/shared/event.service';
import { ISession } from '../events/shared/session.model';
import { AuthService } from '../user/auth.service';

@Component({
    selector: 'nav-bar',
    templateUrl: 'app/nav/navbar.component.html',
    styleUrls: [ 'app/nav/navbar.component.scss' ]
})
export class NavBarComponent {

    public searchTerm: string = '';
    public foundSessions: ISession[];

    constructor(private auth: AuthService, private eventService: EventService) {

    }

    public searchSessions(searchTerm) {
        this.eventService.searchSessions(searchTerm)
            .subscribe(sessions => {
                this.foundSessions = sessions;
            });
    }
}