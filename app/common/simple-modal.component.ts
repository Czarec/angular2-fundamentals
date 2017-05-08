import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Component({
    selector: 'simple-modal',
    templateUrl: 'app/common/simple-modal.component.html',
    styleUrls: [ 'app/common/simple-modal.component.scss' ]
})
export class SimpleModalComponent {
    @Input() elementId: string;
    @Input() title: string;
    @Input() closeOnBodyClick: string;
    @ViewChild('modalcontainer') containerEl: ElementRef;

    constructor(@Inject(JQ_TOKEN) private $: any) {

    }

    closeModal() {
        if (this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
            this.$(this.containerEl.nativeElement).modal('hide');
        }
    }
}
