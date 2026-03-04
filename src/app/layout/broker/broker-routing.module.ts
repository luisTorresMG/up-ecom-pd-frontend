import { Component, NgModule } from '@angular/core';
import { LoginRemoteComponent } from './components/login/login-remote.component';
import { BrokerComponent } from './broker.component';
import { MenuAuthorizationGuard } from './guards/menu-authorization.guard';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardL } from './guards/lote.guard';
import { AuthGuardC } from './guards/comlot.guard';
import { LoginComponent } from './components/login';
import { WelcomeComponent } from '~shared/components/soat/generic/welcome/welcome.component';

const broutes: Routes = [
    { path: 'login-remote', component: LoginRemoteComponent },
    {
        path: '',
        component: BrokerComponent,
        canActivateChild: [MenuAuthorizationGuard],
        children: [
            { path: 'welcome', component: WelcomeComponent },
            { path: 'login', component: LoginComponent },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(broutes)],
    declarations: [],
    exports: [RouterModule],
    providers: [AuthGuardL, AuthGuardC],
})
export class BrokerRoutingModule {
}
