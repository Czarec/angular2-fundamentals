import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    templateUrl: 'app/user/login.component.html',
    styleUrls: [ 'app/user/login.component.scss' ]
})
export class LoginComponent {

    public loginInvalid = false;

    constructor(private authService: AuthService, private router: Router) { }

    public login(formValues) {
        this.authService.loginUser(formValues.userName, formValues.password)
            .subscribe(res => {
                if (!res) {
                    this.loginInvalid = true;
                } else {
                    this.router.navigate(['events']);
                }                
            });        
    }

    public cancel() {
        this.router.navigate(['events']);
    }
}