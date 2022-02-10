import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members/members.component';

@NgModule({
    declarations: [
        MembersComponent
    ],
    imports: [
        SharedModule,
        MembersRoutingModule
    ]
})
export class MembersModule { }
