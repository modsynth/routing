import { NavigationItem, RouteConfig } from './types';

/**
 * Generate breadcrumb items from current path
 *
 * @example
 * ```ts
 * const breadcrumbs = generateBreadcrumbs('/products/electronics/phones');
 * // [
 * //   { label: 'Home', path: '/' },
 * //   { label: 'Products', path: '/products' },
 * //   { label: 'Electronics', path: '/products/electronics' },
 * //   { label: 'Phones', path: '/products/electronics/phones' }
 * // ]
 * ```
 */
export function generateBreadcrumbs(
  path: string,
  labelMap?: Record<string, string>
): Array<{ label: string; path: string }> {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [{ label: 'Home', path: '/' }];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = labelMap?.[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ label, path: currentPath });
  }

  return breadcrumbs;
}

/**
 * Check if user has required role for navigation item
 */
export function hasRequiredRole(
  userRoles: string[],
  requiredRoles?: string[]
): boolean {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  return requiredRoles.some((role) => userRoles.includes(role));
}

/**
 * Filter navigation items based on user authentication and roles
 */
export function filterNavigationItems(
  items: NavigationItem[],
  isAuthenticated: boolean,
  userRoles: string[] = []
): NavigationItem[] {
  return items.filter((item) => {
    // Filter by authentication
    if (item.protected && !isAuthenticated) {
      return false;
    }

    // Filter by roles
    if (item.roles && !hasRequiredRole(userRoles, item.roles)) {
      return false;
    }

    // Recursively filter children
    if (item.children) {
      item.children = filterNavigationItems(item.children, isAuthenticated, userRoles);
    }

    return true;
  });
}

/**
 * Find route config by path
 */
export function findRouteByPath(
  routes: RouteConfig[],
  path: string
): RouteConfig | undefined {
  for (const route of routes) {
    if (route.path === path) {
      return route;
    }

    if (route.children) {
      const found = findRouteByPath(route.children, path);
      if (found) {
        return found;
      }
    }
  }

  return undefined;
}
