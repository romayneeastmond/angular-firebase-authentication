import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
    declarations: [
        VerifyComponent
    ],
    imports: [
        SharedModule,
        VerifyRoutingModule
    ]
})
export class VerifyModule { }
