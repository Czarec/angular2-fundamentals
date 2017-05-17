import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service';

@Component({
    templateUrl: 'app/user/profile.component.html',
    styleUrls: ['app/user/profile.component.scss']
})
export class ProfileComponent implements OnInit {
    
    constructor(
        private auth: AuthService,
        private router: Router,
        @Inject(TOASTR_TOKEN) private toastr: Toastr) {

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
            this.auth.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe(() => {
                this.toastr.success('Profile Saved');
            });            
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

    logout() {
        this.auth.logout().subscribe(() => {
            this.router.navigate(['/user/login'])
        });
    }
}