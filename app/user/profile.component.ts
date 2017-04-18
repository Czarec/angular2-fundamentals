import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    templateUrl: 'app/user/profile.component.html'
})
export class ProfileComponent implements OnInit {
    
    constructor(private auth: AuthService, private router: Router) {

    }

    profileForm: FormGroup;

    ngOnInit() {
        let firstName = new FormControl(this.auth.currentUser.firstName);
        let lastName = new FormControl(this.auth.currentUser.lastName);
        this.profileForm = new FormGroup({
            firstName: firstName,
            lastName: lastName
        });
    }

    saveProfile(formValues) {
        this.auth.updateCurrentUser(formValues.firstName, formValues.lastName);
        this.router.navigate(['events']);
    }

    cancel() {
        this.router.navigate(['events']);
    }
}