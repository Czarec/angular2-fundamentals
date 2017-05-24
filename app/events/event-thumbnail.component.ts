import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    templateUrl: 'app/events/event-thumbnail.component.html',
    styleUrls: [ 'app/events/event-thumbnail.component.scss' ]
})
export class EventThumbnailComponent {
    @Input() public event: any;

    public getStartTimeClass(): any {
        const earlyStart = this.event && this.event.time === '8:00 am';
        return {
            green: earlyStart,
            bold: earlyStart
        };
    }
}