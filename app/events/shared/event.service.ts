import { EventEmitter, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IEvent } from './event.model';
import { ISession } from './session.model';

@Injectable()
export class EventService {

    constructor(private http: Http) {
    }
    
    public getEvents(): Observable<IEvent[]> {
        return this.http.get('/api/events')
            .map(res => <IEvent[]>res.json())
            .catch(this.handleError);
    }

    public getEvent(id: number): Observable<IEvent> {
        return this.http.get('/api/events/' + id)
            .map(res => <IEvent>res.json())
            .catch(this.handleError);
    }

    public saveEvent(evt: IEvent): Observable<IEvent> {
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers });

        return this.http.post('/api/events', JSON.stringify(evt), options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public searchSessions(searchTerm: string) {
        return this.http.get('/api/sessions/search?search=' + searchTerm)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.status);
    }
}