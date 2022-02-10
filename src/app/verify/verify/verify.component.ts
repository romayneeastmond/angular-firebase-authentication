import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { ValidatorService } from '../../shared/validator.service';
import { AuthenticationService } from '../../api/service/authentication.service';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
    emailAddress: string;
    errors: any[] = [];
    loading = false;
    clickableSubmit = true;

    constructor(private router: Router, private sharedService: SharedService,
        private validatorService: ValidatorService, private authenticationService: AuthenticationService) {
        this.sharedService.setTitle('Firebase Authentication | Verify');

    }

    ngOnInit(): void {
        this.emailAddress = this.authenticationService.getVerificationEmail();
    }

    async onSubmit() {
        let validationErrors: any[] = [];

        if (validationErrors.length === 0) {
            const result = await this.authenticationService.sendVerification();

            validationErrors = result;
        }

        this.errors = validationErrors;
        this.clickableSubmit = false;
    }
}
