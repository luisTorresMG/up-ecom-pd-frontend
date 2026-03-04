import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MenuAuthorizationGuard implements CanActivateChild {
  private readonly publicPaths: string[] = [
    '/extranet/login',
    '/extranet/renew-password',
    '/extranet/retrieve',
    '/extranet/retrieve-send',
    '/extranet/login-profile',
  ];

  private readonly publicPrefixes: string[] = [
    '/extranet/transact-access-desgravamen/',
    '/extranet/transact-access/',
    '/extranet/login-eps/',
  ];

  constructor(private readonly router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requestedPath = this.normalizePath(state.url);

    if (this.isPublicRoute(requestedPath)) {
      return true;
    }

    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/extranet/login']);
      return false;
    }

    if (requestedPath === '/extranet/welcome') {
      return true;
    }

    const allowedPaths = this.getAllowedPaths(currentUser.menu || []);
    const isAllowed = this.isAllowedPath(requestedPath, allowedPaths);

    if (isAllowed) {
      return true;
    }

    const menuAliases = this.getAllowedMenuAliases(childRoute);
    const hasAliasAccess = menuAliases.some((aliasPath) =>
      this.isAllowedPath(aliasPath, allowedPaths)
    );

    if (hasAliasAccess) {
      return true;
    }

    this.router.navigate(['/extranet/welcome']);
    return false;
  }

  private isPublicRoute(path: string): boolean {
    if (this.publicPaths.includes(path)) {
      return true;
    }

    return this.publicPrefixes.some((prefix) => path.startsWith(prefix));
  }

  private getCurrentUser(): any | null {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      return currentUser && Object.keys(currentUser).length ? currentUser : null;
    } catch {
      return null;
    }
  }

  private getAllowedPaths(menu: any[]): string[] {
    const paths = new Set<string>();

    const collectPaths = (items: any[]): void => {
      if (!Array.isArray(items)) {
        return;
      }

      items.forEach((item: any) => {
        const stag = item && item.stag ? this.normalizePath(item.stag) : '';
        if (stag) {
          paths.add(stag);
        }

        if (item && Array.isArray(item.children) && item.children.length) {
          collectPaths(item.children);
        }
      });
    };

    collectPaths(menu);
    return Array.from(paths);
  }

  private isAllowedPath(path: string, allowedPaths: string[]): boolean {
    return allowedPaths.some((allowedPath) => {
      if (allowedPath === path) {
        return true;
      }

      if (!allowedPath.includes('/:')) {
        return false;
      }

      const pattern = allowedPath.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp('^' + pattern + '$');
      return regex.test(path);
    });
  }

  private getAllowedMenuAliases(route: ActivatedRouteSnapshot): string[] {
    const activeRoute = this.getDeepestRoute(route);
    const routeData = activeRoute && activeRoute.data ? activeRoute.data : null;
    const aliases: string[] =
      routeData && Array.isArray(routeData['allowedMenuStags'])
        ? routeData['allowedMenuStags']
        : [];

    return aliases
      .map((alias: string) => this.normalizePath(alias))
      .filter((alias) => !!alias);
  }

  private getDeepestRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }

  private normalizePath(path: string): string {
    if (!path) {
      return '';
    }

    const [value] = path.split('?');
    const [cleanPath] = value.split('#');

    let normalized = cleanPath.trim();
    if (!normalized.startsWith('/')) {
      normalized = '/' + normalized;
    }

    normalized = normalized.replace(/\/+$/, '');

    // Legacy menu stags may come as "broker/..." while app routes resolve under "/extranet/...".
    if (normalized === '/broker') {
      return '/extranet';
    }
    if (normalized.startsWith('/broker/')) {
      return normalized.replace('/broker/', '/extranet/');
    }

    return normalized;
  }
}
