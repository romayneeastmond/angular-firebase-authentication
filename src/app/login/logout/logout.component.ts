import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { AuthenticationService } from '../../api/service/authentication.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
    constructor(private router: Router, private sharedService: SharedService, private authenticationService: AuthenticationService) {
        this.sharedService.setTitle('Firebase Authentication | Logout');
    }

    ngOnInit(): void {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
