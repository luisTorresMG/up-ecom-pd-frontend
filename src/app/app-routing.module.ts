import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectLoginGuard } from '~shared/guards/redirect-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./inicio/inicio.module').then((m) => m.InicioModule),
  },  
  {
    path: 'extranet',
    loadChildren: () =>
      // import('./layout/broker/broker.module').then((m) => m.BrokerModule),
    import('./layout/broker/broker.module').then((m) => m.BrokerModule),
    canActivate: [RedirectLoginGuard],
  }, 
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
