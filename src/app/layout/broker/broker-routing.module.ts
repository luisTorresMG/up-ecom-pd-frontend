import { Component, NgModule } from '@angular/core';
import { LoginRemoteComponent } from './components/login/login-remote.component';
import { BrokerComponent } from './broker.component';

const broutes: Routes = [
    { path: 'login-remote', component: LoginRemoteComponent },
    {
        path: '',
        component: BrokerComponent,
        canActivateChild: [MenuAuthorizationGuard],

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
