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
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'collapse',
        icon: 'feather icon-home',
        children: [
          {
            id: 'analytics',
            title: 'Analytics',
            type: 'item',
            url: '/dashboard/analytics',
            breadcrumbs: false
          },
          {
            id: 'sale',
            title: 'Sales',
            type: 'item',
            url: '/dashboard/sale'
          }
        ]
      },
      {
        id: 'page-layouts',
        title: 'Page Layouts',
        type: 'collapse',
        icon: 'feather icon-layout',
        children: [
          {
            id: 'vertical',
            title: 'Vertical',
            type: 'collapse',
            children: [
              {
                id: 'v-static',
                title: 'Static',
                type: 'item',
                url: '/layout/static',
                target: true,
              },
              {
                id: 'v-fixed',
                title: 'Fixed',
                type: 'item',
                url: '/layout/fixed',
                target: true,
              },
              {
                id: 'v-nav-fixed',
                title: 'Navbar Fixed',
                type: 'item',
                url: '/layout/nav-fixed',
                target: true,
              },
              {
                id: 'v-collapse-menu',
                title: 'Collapse Menu',
                type: 'item',
                url: '/layout/collapse-menu',
                target: true,
              },
              {
                id: 'v-rtl',
                title: 'Vertical RTL',
                type: 'item',
                url: '/layout/vertical-rtl',
                target: true
              }
            ]
          },
          {
            id: 'horizontal',
            title: 'Horizontal',
            type: 'item',
            url: '/layout/horizontal',
            target: true
          },
          {
            id: 'horizontal-l2',
            title: 'Horizontal v2',
            type: 'item',
            url: '/layout/horizontal-l2',
            target: true
          },
          {
            id: 'horizontal-rtl',
            title: 'Horizontal RTL',
            type: 'item',
            url: '/layout/horizontal-rtl',
            target: true
          },
          {
            id: 'box-layout',
            title: 'Box Layout',
            type: 'item',
            url: '/layout/box',
            target: true
          },
          {
            id: 'light-layout',
            title: 'Light Layout',
            type: 'item',
            url: '/layout/light',
            target: true
          },
          {
            id: 'dark-layout',
            title: 'Dark Layout',
            type: 'item',
            url: '/layout/dark',
            target: true,
            badge: {
              title: 'Hot',
              type: 'badge-danger'
            }
          }
        ]
      },
      {
        id: 'widget',
        title: 'Widget',
        type: 'collapse',
        icon: 'feather icon-layers',
        badge: {
          title: '100+',
          type: 'badge-success'
        },
        children: [
          {
            id: 'statistic',
            title: 'Statistic',
            type: 'item',
            url: '/widget/statistic'
          },
          {
            id: 'data',
            title: 'Data',
            type: 'item',
            url: '/widget/data'
          },
          {
            id: 'chart',
            title: 'Chart',
            type: 'item',
            url: '/widget/chart'
          }
        ]
      },
      {
        id: 'users',
        title: 'User',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            url: '/users/profile',
            breadcrumbs: false
          },
          {
            id: 'cards',
            title: 'User Card',
            type: 'item',
            url: '/users/card'
          },
          {
            id: 'list',
            title: 'User List',
            type: 'item',
            url: '/users/list'
          }
        ]
      }
    ]
  },
  {
    id: 'ui-element',
    title: 'UI ELEMENT',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'basic',
        title: 'Basic',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'alert',
            title: 'Alert',
            type: 'item',
            url: '/basic/alert'
          },
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/basic/button'
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/basic/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumbs & Pagination',
            type: 'item',
            url: '/basic/breadcrumb-paging'
          },
          {
            id: 'cards',
            title: 'Cards',
            type: 'item',
            url: '/basic/cards'
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'carousel',
            title: 'Carousel',
            type: 'item',
            url: '/basic/carousel'
          },
          {
            id: 'grid-system',
            title: 'Grid System',
            type: 'item',
            url: '/basic/grid-system'
          },
          {
            id: 'progress',
            title: 'Progress',
            type: 'item',
            url: '/basic/progress'
          },
          {
            id: 'modal',
            title: 'Modal',
            type: 'item',
            url: '/basic/modal'
          },
          {
            id: 'spinner',
            title: 'Spinner',
            type: 'item',
            url: '/basic/spinner'
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/basic/tabs-pills'
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/basic/typography'
          },
          {
            id: 'tooltip-popovers',
            title: 'Tooltip & Popovers',
            type: 'item',
            url: '/basic/tooltip-popovers'
          },
          {
            id: 'toasts',
            title: 'Toasts',
            type: 'item',
            url: '/basic/toasts'
          },
          {
            id: 'other',
            title: 'Other',
            type: 'item',
            url: '/basic/other'
          }
        ]
      },
      {
        id: 'advance',
        title: 'Advance',
        type: 'collapse',
        icon: 'feather icon-gitlab',
        children: [
          {
            id: 'sweet-alert',
            title: 'Sweet Alert',
            type: 'item',
            url: '/advance/alert'
          },
          {
            id: 'datepicker',
            title: 'Datepicker',
            type: 'item',
            url: '/advance/datepicker'
          },
          {
            id: 'task-board',
            title: 'Task Board',
            type: 'item',
            url: '/advance/task-board'
          },
          {
            id: 'light-box',
            title: 'Light Box',
            type: 'item',
            url: '/advance/light-box'
          },
          {
            id: 'notification',
            title: 'Notification',
            type: 'item',
            url: '/advance/notification'
          },
          {
            id: 'rating',
            title: 'Rating',
            type: 'item',
            url: '/advance/rating'
          },
          {
            id: 'range-slider',
            title: 'Range Slider',
            type: 'item',
            url: '/advance/range-slider'
          },
        ]
      }
    ]
  },
  {
    id: 'forms',
    title: 'Forms',
    type: 'group',
    icon: 'feather icon-layout',
    children: [
      {
        id: 'forms-element',
        title: 'Forms',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'form-elements',
            title: 'Form Elements',
            type: 'item',
            url: '/forms/basic'
          },
          {
            id: 'form-elements',
            title: 'Form Advance',
            type: 'item',
            url: '/forms/advance'
          },
          {
            id: 'form-validation',
            title: 'Form Validation',
            type: 'item',
            url: '/forms/validation'
          },
          {
            id: 'form-masking',
            title: 'Form Masking',
            type: 'item',
            url: '/forms/masking'
          },
          {
            id: 'form-wizard',
            title: 'Form Wizard',
            type: 'item',
            url: '/forms/wizard'
          },
          {
            id: 'form-picker',
            title: 'Form Picker',
            type: 'item',
            url: '/forms/picker'
          },
          {
            id: 'form-select',
            title: 'Form Select',
            type: 'item',
            url: '/forms/select'
          }
        ]
      }
    ]
  },
  {
    id: 'table',
    title: 'Table',
    type: 'group',
    icon: 'feather icon-list',
    children: [
      {
        id: 'bootstrap',
        title: 'Bootstrap',
        type: 'collapse',
        icon: 'feather icon-server',
        children: [
          {
            id: 'bt-basic',
            title: 'Basic Table',
            type: 'item',
            url: '/tbl-bootstrap/bt-basic'
          },
          {
            id: 'bt-sizing',
            title: 'Sizing Table',
            type: 'item',
            url: '/tbl-bootstrap/bt-sizing'
          },
          {
            id: 'bt-border',
            title: 'Border Table',
            type: 'item',
            url: '/tbl-bootstrap/bt-border'
          },
          {
            id: 'bt-styling',
            title: 'Styling Table',
            type: 'item',
            url: '/tbl-bootstrap/bt-styling'
          }
        ]
      },
      {
        id: 'data-table',
        title: 'Data Table',
        type: 'item',
        icon: 'feather icon-grid',
        url: '/tbl-datatable'
      }
    ]
  },
  {
    id: 'chart-maps',
    title: 'Chart & Maps',
    type: 'group',
    icon: 'feather icon-pie-chart',
    children: [
      {
        id: 'charts',
        title: 'Charts',
        type: 'collapse',
        icon: 'feather icon-pie-chart',
        children: [
          {
            id: 'apex',
            title: 'Apex Chart',
            type: 'item',
            url: '/charts/apex'
          },
          {
            id: 'chart-js',
            title: 'Chart JS',
            type: 'item',
            url: '/charts/chart-js'
          },
          {
            id: 'high-chart',
            title: 'High Chart',
            type: 'item',
            url: '/charts/high-chart'
          },
          {
            id: 'peity',
            title: 'Peity',
            type: 'item',
            url: '/charts/peity'
          }
        ]
      },
      {
        id: 'maps',
        title: 'Maps',
        type: 'collapse',
        icon: 'feather icon-map',
        children: [
          {
            id: 'google',
            title: 'Google',
            type: 'item',
            url: '/maps/google'
          },
          /*{
            id: 'vector',
            title: 'Vector',
            type: 'item',
            url: '/maps/vector'
          },
          {
            id: 'gmap-search-api',
            title: 'Gmap Search API',
            type: 'item',
            url: '/maps/gmap-search-api'
          },
          {
            id: 'location',
            title: 'Location',
            type: 'item',
            url: '/maps/location'
          }*/
        ]
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'feather icon-file-text',
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Sign up',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signup-v2',
            title: 'Sign up v2',
            type: 'item',
            url: '/auth/signup-v2',
            badge: {
              title: 'New',
              type: 'badge-primary'
            },
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin',
            title: 'Sign in',
            type: 'item',
            url: '/auth/signin',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin-v2',
            title: 'Sign in v2',
            type: 'item',
            url: '/auth/signin-v2',
            badge: {
              title: 'New',
              type: 'badge-primary'
            },
            target: true,
            breadcrumbs: false
          },
          {
            id: 'reset-password',
            title: 'Reset Password',
            type: 'item',
            url: '/auth/reset-password',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'reset-password-v2',
            title: 'Reset Password v2',
            type: 'item',
            url: '/auth/reset-password-v2',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'change-password',
            title: 'Change Password',
            type: 'item',
            url: '/auth/change-password',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'change-password-v2',
            title: 'Change Password v2',
            type: 'item',
            url: '/auth/change-password-v2',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'personal-information',
            title: 'Personal Information',
            type: 'item',
            url: '/auth/personal-information',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'profile-settings',
            title: 'Profile Settings',
            type: 'item',
            url: '/auth/profile-settings',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'maintenance',
        title: 'Maintenance',
        type: 'collapse',
        icon: 'feather icon-sliders',
        children: [
          {
            id: 'error',
            title: 'Error',
            type: 'item',
            url: '/maintenance/error',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'offline-ui',
            title: 'Offline UI',
            type: 'item',
            url: '/maintenance/offline-ui',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'coming-soon',
            title: 'Maintenance',
            type: 'item',
            url: '/maintenance/coming-soon',
            target: true,
            breadcrumbs: false
          }
        ]
      }
    ]
  },
  {
    id: 'app',
    title: 'App',
    type: 'group',
    icon: 'feather icon-tv',
    children: [
      {
        id: 'email',
        title: 'Email',
        type: 'collapse',
        icon: 'feather icon-mail',
        children: [
          {
            id: 'mail-inbox',
            title: 'Inbox',
            type: 'item',
            url: '/email/mail-inbox'
          },
          {
            id: 'mail-read',
            title: 'Read Mail',
            type: 'item',
            url: '/email/mail-read'
          },
          {
            id: 'mail-compose',
            title: 'Compose Mail',
            type: 'item',
            url: '/email/mail-compose'
          }
        ]
      },
      {
        id: 'task',
        title: 'Task',
        type: 'collapse',
        icon: 'feather icon-clipboard',
        children: [
          {
            id: 'task-list',
            title: 'List',
            type: 'item',
            url: '/task/list'
          },
          {
            id: 'task-board',
            title: 'Board',
            type: 'item',
            url: '/task/board'
          },
          {
            id: 'task-detail',
            title: 'Detail',
            type: 'item',
            url: '/task/detail'
          }
        ]
      },
      {
        id: 'to-dos',
        title: 'Todo',
        type: 'collapse',
        icon: 'feather icon-check-square',
        children: [
          {
            id: 'todo',
            title: 'Todo',
            type: 'item',
            url: '/todo/basic'
          }
        ]
      },
      {
        id: 'gallery',
        title: 'Gallery',
        type: 'collapse',
        icon: 'feather icon-image',
        children: [
          {
            id: 'grid',
            title: 'Grid',
            type: 'item',
            url: '/gallery/grid'
          },
          {
            id: 'masonry',
            title: 'Masonry',
            type: 'item',
            url: '/gallery/masonry'
          }
        ]
      },
      {
        id: 'helpdesk',
        title: 'Helpdesk',
        type: 'collapse',
        icon: 'feather icon-help-circle',
        badge: {
          title: 'New',
          type: 'badge-success'
        },
        children: [
          {
            id: 'hd-dashboard',
            title: 'Helpdesk Dashboard',
            type: 'item',
            url: '/helpdesk/hd-dashboard'
          },
          {
            id: 'hd-customer',
            title: 'Customer Dashboard',
            type: 'item',
            url: '/helpdesk/hd-customer'
          },
          {
            id: 'hd-customer-list',
            title: 'Customer List',
            type: 'item',
            url: '/helpdesk/hd-customer-list'
          },
          {
            id: 'hd-customer-detail',
            title: 'Customer Detail',
            type: 'item',
            url: '/helpdesk/hd-customer-detail'
          },
          {
            id: 'hd-ticket',
            title: 'Ticket',
            type: 'item',
            url: '/helpdesk/hd-ticket'
          }
        ]
      }
    ]
  },
  {
    id: 'extension',
    title: 'Extension',
    type: 'group',
    icon: 'feather icon-cpu',
    children: [
      {
        id: 'editor',
        title: 'Editor',
        type: 'collapse',
        icon: 'feather icon-file-plus',
        children: [
          {
            id: 'tinymce-editor',
            title: 'Tinymce Editor',
            type: 'item',
            url: '/editor/tinymce'
          },
          {
            id: 'pell-wysiwyg',
            title: 'Pell WYSIWYG',
            type: 'item',
            url: '/editor/wysiwyg'
          }
        ]
      },
      {
        id: 'invoice',
        title: 'Invoice',
        type: 'collapse',
        icon: 'feather icon-file-minus',
        children: [
          {
            id: 'invoice-basic',
            title: 'Invoice Basic',
            type: 'item',
            url: '/invoice/basic'
          },
          {
            id: 'invoice-summary',
            title: 'Invoice Summary',
            type: 'item',
            url: '/invoice/summary'
          },
          {
            id: 'invoice-list',
            title: 'Invoice List',
            type: 'item',
            url: '/invoice/list'
          }
        ]
      },
      {
        id: 'full-calendar',
        title: 'Full Calendar',
        type: 'item',
        url: '/full-calendar',
        classes: 'nav-item',
        icon: 'feather icon-calendar'
      },
      {
        id: 'file-upload',
        title: 'File Upload',
        type: 'item',
        url: '/file-upload',
        classes: 'nav-item',
        icon: 'feather icon-upload-cloud'
      }
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
  {
    id: 'support',
    title: 'Support',
    type: 'group',
    icon: 'feather icon-help-circle',
    children: [
      {
        id: 'documentation',
        title: 'Documentation',
        type: 'item',
        icon: 'feather icon-book',
        classes: 'nav-item',
        url: 'https://codedthemes-2.gitbook.io/gradient-able-angular/',
        target: true,
        external: true
      },
      {
        id: 'need-support',
        title: 'Need Support?',
        type: 'item',
        icon: 'feather icon-help-circle',
        classes: 'nav-item',
        url: 'https://codedthemes.com/submit-ticket/',
        target: true,
        external: true,
        badge: {
          title: 'v1.0',
          type: 'badge-primary'
        }
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
