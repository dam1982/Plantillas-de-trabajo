import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'home',
    title: 'Inicio',
    type: 'group',
    icon: 'feather icon-help-circle',
    children: [

      {
        id: 'analytics',
        title: 'Mis Resultados',
        icon: 'feather icon-home',
        type: 'item',
        url: '/dashboard/analytics',
        classes: 'nav-item',
        breadcrumbs: false
      },
      
      {
        id: 'documentation',
        title: 'Documentación',
        type: 'item',
        icon: 'feather icon-book',
        classes: 'nav-item',
        url: 'https://codedthemes-2.gitbook.io/gradient-able-angular/',
        target: true,
        external: true
      },
      
    ]
  },
  
  
  {
    id: 'admin',
    title: 'Administración',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'system',
        title: 'Sistema',
        type: 'collapse',
        icon: 'feather icon-settings',
        children: [
          {
            id: 'users',
            title: 'Usuarios',
            type: 'item',
            url: '/dashboard/analytics',
            breadcrumbs: true
          },          
          {
            id: 'clients',
            title: 'Clientes',
            type: 'item',
            url: '/administration/clients',
            breadcrumbs: true
          },


        ]
      },      
    ]
  },
  
  
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'menu-level',
        title: 'Menu Levels',
        type: 'collapse',
        icon: 'feather icon-menu',
        children: [
          {
            id: 'menu-level-2.1',
            title: 'Menu Level 2.1',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'menu-level-2.2',
            title: 'Menu Level 2.2',
            type: 'collapse',
            children: [
              {
                id: 'menu-level-2.2.1',
                title: 'Menu Level 2.2.1',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-2.2.2',
                title: 'Menu Level 2.2.2',
                type: 'item',
                url: 'javascript:',
                external: true
              }
            ]
          }
        ]
      },
      {
        id: 'disabled-menu',
        title: 'Disabled Menu',
        type: 'item',
        url: 'javascript:',
        classes: 'nav-item disabled',
        icon: 'feather icon-power',
        external: true
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      }
    ]
  },
  
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
