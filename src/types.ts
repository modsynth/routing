import { ComponentType } from 'react';

/**
 * Route configuration type for type-safe routing
 */
export interface RouteConfig {
  path: string;
  component: ComponentType<any>;
  exact?: boolean;
  protected?: boolean;
  children?: RouteConfig[];
  meta?: {
    title?: string;
    description?: string;
    roles?: string[];
  };
}

/**
 * Navigation item type for building navigation menus
 */
export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
  protected?: boolean;
  roles?: string[];
}
