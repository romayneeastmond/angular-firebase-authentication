import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { ValidatorService } from '../../shared/validator.service';
import { AuthenticationService } from '../../api/service/authentication.service';
import { UserModel } from '../../api/models/user.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    model = new UserModel();
    errors: any[] = [];
    loading = false;

    constructor(private router: Router, private sharedService: SharedService, private validatorService: ValidatorService,
        private authenticationService: AuthenticationService) {
        this.sharedService.setTitle('Firebase Authentication | Register');
    }

    ngOnInit(): void {

    }

    async onRegister() {
        this.errors = [];

        this.validatorService.required(this.errors, this.model.firstName, 'First Name is required.');
        this.validatorService.required(this.errors, this.model.lastName, 'Last Name is required.');
        this.validatorService.required(this.errors, this.model.emailAddress, 'Email Address is required.');
        this.validatorService.formatEmailAddress(this.errors, this.model.emailAddress, 'Email Address should be in valid email@address.com format.');
        this.validatorService.required(this.errors, this.model.password, 'Password is required.');
        this.validatorService.length(this.errors, this.model.password, 6, 'Password should be at least 6 characters.');
        this.validatorService.required(this.errors, this.model.confirmPassword, 'Confirm Password is required.');
        this.validatorService.compare(this.errors, this.model.password, this.model.confirmPassword, 'Passwords must match.');

        if (this.errors.length > 0) {
            return;
        }

        this.loading = true;

        await this.authenticationService.register(this.model.firstName, this.model.lastName, this.model.emailAddress, this.model.password)
            .then((result) => {
                if (result.length === 0) {
                    this.authenticationService.setVerificationEmail(this.model.emailAddress.trim().toLowerCase())

                    this.router.navigate(['/verify']);
                } else {
                    this.errors.push(result);

                    this.loading = false;
                }
            }).catch((error) => {
                this.errors.push(error.message);

                this.loading = false;
            });
    }
}
