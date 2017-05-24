import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { IUser } from './user.model';

@Injectable()
export class AuthService {

    public currentUser: IUser;
    
    constructor(private http: Http) {        
    }

    public loginUser(userName: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers }); 
        let loginInfo = { username: userName, password };

        return this.http.post('/api/login', JSON.stringify(loginInfo), options).do(res => {
            if (res) {
                this.currentUser = <IUser>res.json().user;
            }
        }).catch(err => {
            return Observable.of(false);
        });
    }

    public isAuthenticated() {
        return !!this.currentUser;
    }

    public checkAuthenticationStatus() {
        this.http.get('/api/currentIdentity').map((res: any) => {
            if (res._body) {
                return res.json();
            } else {
                return {};
            }
        }).do(currentUser => {
            if (!!currentUser.userName) {
                this.currentUser = currentUser;
            }
        }).subscribe();
    }

    public updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers });

        return this.http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), options);
    }

    public logout() {
        this.currentUser = undefined;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers });

        return this.http.post('/api/logout', JSON.stringify({}), options);
    }
}