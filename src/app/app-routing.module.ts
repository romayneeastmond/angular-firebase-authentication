import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { AuthenticatedGuard } from './shared/authenticated.guard';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
    { path: 'register', loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule) },
    { path: 'verify', loadChildren: () => import('./verify/verify.module').then((m) => m.VerifyModule) },
    { path: 'members', loadChildren: () => import('./members/members.module').then((m) => m.MembersModule), canActivate: [AuthenticatedGuard] },
    { path: '**', component: LoginComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
