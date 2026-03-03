import {
  AUTHENTICATION_PATHS,
  ERROR_PATHS,
  POKEMON_PATHS,
  ROOT_PATHS,
  USER_PATHS,
} from '~core/constants/paths.constants';
import type { Route } from '@angular/router';
import { ERROR_URLS } from '~core/constants/urls.constants';
import { authenticationGuard } from '~core/guards/authentication.guard';

export const appRoutes: Route[] = [
  {
    path: ROOT_PATHS.home,
    loadChildren: async () =>
      import('./features/home/home.routes').then((module) => module.HOME_ROUTES),
    data: { preload: true },
  },
  {
    path: AUTHENTICATION_PATHS.base,
    loadChildren: async () =>
      import('./features/authentication/authentication.routes').then(
        (module) => module.AUTHENTICATION_ROUTES,
      ),
  }, 
  {
    path: ERROR_PATHS.base,
    loadChildren: async () =>
      import('./features/error/error.routes').then((module) => module.ERROR_ROUTES),
  },
  { path: '**', redirectTo: ERROR_URLS.notFound },
];
