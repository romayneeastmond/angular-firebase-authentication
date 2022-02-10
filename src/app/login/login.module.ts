import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        SharedModule,
        LoginRoutingModule
    ]
})
export class LoginModule { }
