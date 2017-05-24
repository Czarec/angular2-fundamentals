import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Component({
    selector: 'simple-modal',
    templateUrl: 'app/common/simple-modal.component.html',
    styleUrls: [ 'app/common/simple-modal.component.scss' ]
})
export class SimpleModalComponent {
    @Input() public elementId: string;
    @Input() public title: string;
    @Input() public closeOnBodyClick: string;
    @ViewChild('modalcontainer') public containerEl: ElementRef;

    constructor(@Inject(JQ_TOKEN) private $: any) {

    }

    public closeModal() {
        if (this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
            this.$(this.containerEl.nativeElement).modal('hide');
        }
    }
}
