import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { AuthenticationService } from '../../api/service/authentication.service';
import { UserModel } from '../../api/models/user.model';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
    model = new UserModel();

    constructor(private router: Router, private sharedService: SharedService,
        private authenticationService: AuthenticationService) {
        this.sharedService.setTitle('Firebase Authentication | Members');

        if (!this.authenticationService.getLoggedInUser()) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit(): void {
        const result = this.authenticationService.getLoggedInUser();

        this.model = {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            emailAddress: result.emailAddress
        } as UserModel
    }

    onLogout() {
        this.router.navigate(['/login/out']);
    }
}
