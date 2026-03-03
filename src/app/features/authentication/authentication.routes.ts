import { LogInComponent } from '~features/authentication/pages/log-in/log-in.component';
import { noAuthenticationGuard } from '~core/guards/no-authentication.guard';
import { AUTHENTICATION_PATHS } from '~core/constants/paths.constants';
import { authenticationGuard } from '~core/guards/authentication.guard';
import { LoginComponent } from './pages/login';

export const AUTHENTICATION_ROUTES = [
  // {
  //   path: AUTHENTICATION_PATHS.logIn,
  //   component: LoginComponent,
  //   canActivate: [noAuthenticationGuard],
  // },
  {
    path: AUTHENTICATION_PATHS.logIn,
    component: LogInComponent,
    canActivate: [noAuthenticationGuard],
  }
 
];
