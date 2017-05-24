import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'upvote',
    templateUrl: 'app/events/event-details/upvote.component.html',
    styleUrls: [ 'app/events/event-details/upvote.component.scss' ]
})
export class UpvoteComponent {
    
    @Input() public count: number;
    @Input() public set voted(val) {
        this.iconColor = val ? 'red' : 'white';
    }
    @Output() public vote = new EventEmitter();
    public iconColor: string;

    public onClick() {
        this.vote.emit({});
    }
}