import { Component, Input } from '@angular/core';

@Component({
    selector: 'collapsible-well',
    templateUrl: 'app/common/collapsible-well.component.html',
    styleUrls: ['app/common/collapsible-well.component.scss']
})
export class CollapsibleWellComponent {
    @Input() title: string;
    visible: boolean = true;

    toggleContent() {
        this.visible = !this.visible;
    }
}