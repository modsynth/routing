// Re-export from react-router-dom
export {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
  Outlet,
  NavLink,
  useSearchParams,
} from 'react-router-dom';

// Export custom components
export { ProtectedRoute } from './ProtectedRoute';
export type { ProtectedRouteProps } from './ProtectedRoute';

// Export types
export type { RouteConfig, NavigationItem } from './types';

// Export hooks
export { useDocumentTitle, usePageTracking, useScrollToTop } from './hooks';

// Export utilities
export {
  generateBreadcrumbs,
  hasRequiredRole,
  filterNavigationItems,
  findRouteByPath,
} from './utils';
