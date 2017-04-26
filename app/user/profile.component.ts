import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    templateUrl: 'app/user/profile.component.html',
    styleUrls: ['app/user/profile.component.scss']
})
export class ProfileComponent implements OnInit {
    
    constructor(private auth: AuthService, private router: Router) {

    }

    profileForm: FormGroup;
    firstName: FormControl;
    lastName: FormControl;

    ngOnInit() {
        this.firstName = new FormControl(this.auth.currentUser.firstName, [ Validators.required, Validators.pattern('[a-zA-Z].*') ]);
        this.lastName = new FormControl(this.auth.currentUser.lastName, Validators.required);
        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        });
    }

    saveProfile(formValues) {
        if (this.profileForm.valid) {
            this.auth.updateCurrentUser(formValues.firstName, formValues.lastName);
            this.router.navigate(['events']);
        }
    }

    validateLastName() {
        return this.lastName.valid || this.lastName.untouched;
    }

    validateFirstName() {
        return this.firstName.valid || this.firstName.untouched;
    }

    cancel() {
        this.router.navigate(['events']);
    }
}