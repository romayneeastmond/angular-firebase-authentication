import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { ValidatorService } from '../../shared/validator.service';
import { AuthenticationService } from '../../api/service/authentication.service';
import { UserModel } from '../../api/models/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model = new UserModel();
    rememberMe = false;
    returnUrl: string;
    errors: any[] = [];
    loading = false;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private sharedService: SharedService,
        private validatorService: ValidatorService, private authenticationService: AuthenticationService) {
        this.sharedService.setTitle('Firebase Authentication | Login');

        if (this.authenticationService.getLoggedInUser()) {
            this.router.navigate(['/members']);
        }
    }

    ngOnInit(): void {
        const queryParam = 'returnUrl';

        this.returnUrl = this.activatedRoute.snapshot.queryParams[queryParam] || '/members';

        const result = this.authenticationService.getLoginValues();

        this.model.emailAddress = result.emailAddress;
        this.rememberMe = result.rememberMe;
    }

    async onLogin() {
        this.errors = [];

        this.validatorService.required(this.errors, this.model.emailAddress, 'Email Address is required.');
        this.validatorService.formatEmailAddress(this.errors, this.model.emailAddress, 'Email Address should be in valid email@address.com format.');
        this.validatorService.required(this.errors, this.model.password, 'Password is required.');

        if (this.errors.length > 0) {
            return;
        }

        this.loading = true;

        await this.authenticationService.login(this.model.emailAddress, this.model.password)
            .then((result) => {
                if (result.validationErrors.length === 0) {
                    if (this.rememberMe === true) {
                        this.authenticationService.rememberMe(this.model.emailAddress.trim().toLowerCase());
                    } else {
                        this.authenticationService.forgetMe();
                    }

                    if (result.verified === true) {
                        this.authenticationService.setLoggedInValues(result.user)

                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.authenticationService.setVerificationEmail(this.model.emailAddress.trim().toLowerCase());

                        this.router.navigate(['/verify']);
                    }

                } else {
                    this.errors = result.validationErrors;
                    this.loading = false;
                }
            }).catch((error) => {
                this.errors.push(error.message);

                this.loading = false;
            });
    }
}
