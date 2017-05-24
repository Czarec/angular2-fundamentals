import { Component, Input, OnChanges } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { ISession } from '../shared/index';
import { VoterService } from './voter.service';

@Component({
    selector: 'session-list',
    templateUrl: 'app/events/event-details/session-list.component.html',
    styleUrls: ['app/events/event-details/session-list.component.scss']
})
export class SessionListComponent implements OnChanges {
    
    @Input() public sessions: ISession[];
    @Input() public filterBy: string;
    @Input() public sortBy: string;
    @Input() public eventId: number;
    public visibleSessions: ISession[] = [];

    constructor(private auth: AuthService, private voterService: VoterService) {

    }

    public ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortBy === 'name'
                ? this.visibleSessions.sort(this.sortByNameAsc)
                : this.visibleSessions.sort(this.sortByVotesDesc);
        }
    }

    public filterSessions(filter) {
        if (filter === 'all') {
            this.visibleSessions = this.sessions.slice(0);
        } else {
            this.visibleSessions = this.sessions.filter(s => {
                return s.level.toLocaleLowerCase() === filter;
            });
        }
    }

    public sortByNameAsc(x: ISession, y: ISession) {
        if (x.name > y.name) {
            return 1;
        } else if (x.name === y.name) {
            return 0;
        } else {
            return -1;
        }
    }

    public sortByVotesDesc(x: ISession, y: ISession) {
        return y.voters.length - x.voters.length;
    }

    public toggleVote(session: ISession) {
        if (this.userHasVoted(session)) {
            this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
        } else {
            this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);
        }
        if (this.sortBy === 'votes') {
            this.visibleSessions.sort(this.sortByVotesDesc);
        }
    }

    public userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
    }
}