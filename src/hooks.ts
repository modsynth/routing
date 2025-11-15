import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to update document title based on route
 *
 * @example
 * ```tsx
 * useDocumentTitle('Dashboard - MyApp');
 * ```
 */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}

/**
 * Hook to track page views (can be integrated with analytics)
 *
 * @example
 * ```tsx
 * usePageTracking((path) => {
 *   console.log('Page view:', path);
 * });
 * ```
 */
export function usePageTracking(onPageView?: (path: string) => void): void {
  const location = useLocation();

  useEffect(() => {
    if (onPageView) {
      onPageView(location.pathname);
    }
  }, [location.pathname, onPageView]);
}

/**
 * Hook to scroll to top on route change
 *
 * @example
 * ```tsx
 * useScrollToTop();
 * ```
 */
export function useScrollToTop(): void {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
}
