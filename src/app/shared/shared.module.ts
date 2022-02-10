import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorsComponent } from './errors/errors.component';

@NgModule({
    declarations: [
        ErrorsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ErrorsComponent,
    ]
})
export class SharedModule {

}