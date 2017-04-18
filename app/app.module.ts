import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventService,
    EventRouteActivator,
    EventsListResolverService
}
from './events/index';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';
import { ToastrService } from './common/toastr.service';
import { AuthService} from './user/auth.service';

import { appRoutes } from './routes';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component
    ],
    providers: [
        EventService,
        ToastrService,
        EventRouteActivator,
        EventsListResolverService,
        AuthService,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState } ],
    bootstrap: [EventsAppComponent]
})

export class AppModule {}

function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('Are you sure?');
    }
    return true;
}