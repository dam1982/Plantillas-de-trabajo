import { Injectable } from '@angular/core';
import { AuthorizationBusinessService } from 'src/app/business/security/authorization-business.service';
import { User } from 'src/app/model/user';

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
  permission: string;
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
        breadcrumbs: false,
        permission: "*"
      },

      {
        id: 'documentation',
        title: 'Documentación',
        type: 'item',
        icon: 'feather icon-book',
        classes: 'nav-item',
        url: '',
        target: true,
        external: true,
        permission: "*"
      },

    ]
  },
  {
    id: 'administration',
    title: 'Administración',
    type: 'group',
    icon: 'feather icon-help-circle',
    children: [

      {
        id: 'printers',
        title: 'Impresoras',
        icon: 'fa fa-hdd',
        type: 'item',
        url: '/administration/printers',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "AdmPrinter"
      },
      {
        id: 'printer-points',
        title: 'Puntos de impresión',
        icon: 'fa fa-map-marker-alt',
        type: 'item',
        url: '/administration/printer-points',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "AdmPrinterPoint"
      },
      {
        id: 'location',
        title: 'Ubicaciones Bodega',
        icon: 'fa fa-boxes',
        type: 'item',
        url: '/administration/location',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "*"
      },
      {
        id: 'adminProfile',
        title: 'Perfiles',
        icon: 'fa fa-id-card',
        type: 'item',
        url: '/administration/adminProfile',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "AdminProfile"
      },
      {
        id: 'users',
        title: 'Usuarios',
        icon: 'fa fa-users',
        type: 'item',
        url: '/administration/users',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "adminUser"
      },
      {
        id: 'catalog',
        title: 'Catálogos',
        icon: 'fa fa-list-ul',
        type: 'item',
        url: '/administration/catalog',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "*"
      },
      {
        id: 'frame',
        title: 'Marcos',
        icon: 'fa fa-crop-alt',
        type: 'item',
        url: '/administration/frame',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "*"
      },
      {
        id: 'updateDataOrder',
        title: 'Actualizar Orden Factory',
        icon: 'fa fa-file-medical-alt',
        type: 'item',
        url: '/tags/updateDataOrder',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "UpdateDataOrder"
      },

    ]
  },

  {
    id: 'tags',
    title: 'Etiquetas',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [

      {
        id: 'internalTag',
        title: 'Etiqueta Interna',
        icon: 'fa fa-tag',
        type: 'item',
        url: '/tags/internalTag',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "InternalTag"
      },
      {
        id: 'externalTag',
        title: 'Etiqueta Externa',
        icon: 'fa fa-boxes',
        type: 'item',
        url: '/tags/externalTag',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "ExternalTag"
      },
      {
        id: 'universal-tag',
        title: 'Etiqueta Universal',
        icon: 'fa fa-barcode',
        type: 'item',
        url: '/universal-tag/universal-tag',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "UniversalTag"
      },
      {
        id: 'universal-external',
        title: 'Etiqueta Externa PST',
        icon: 'fa fa-barcode',
        type: 'item',
        url: '/universal-tag/universal-external',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "UniversalTag"
      },
      {
        id: 'genericTag',
        title: 'Etiqueta Genérica',
        icon: 'fa fa-barcode',
        type: 'item',
        url: '/production/genericTag',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "UniversalTag"
      },
      {
        id: 'palletTag',
        title: 'Etiqueta Estiba',
        icon: 'fa fa-pallet',
        type: 'item',
        url: '/tags/palletTag',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "PalletTag"
      },
      {
        id: 'reprinttag',
        title: 'Reimpresión Interna',
        icon: 'fa fa-print',
        type: 'item',
        url: '/tags/reprinttag',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "ReprintTag"
      },
      {
        id: 'inherited-universal-tag',
        title: 'Etiqueta universal heredada',
        icon: 'fa fa-barcode',
        type: 'item',
        url: '/material-raw/inherited-universal-tag',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "InheritedUnivTag"
      },

    ]
  },

  {
    id: 'transfers',
    title: 'Trasferencias',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'transferFP',
        title: 'Traslados PT',
        icon: 'fa fa-dolly-flatbed',
        type: 'item',
        url: '/transfers/transfersPT',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "TransferPT"
      },
      {
        id: 'confirmTransfer',
        title: 'Confirmar Traslados PT',
        icon: 'fa fa-clipboard-check',
        type: 'item',
        url: '/transfers/confirmTransfer',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "ConfirmTransferP"
      },
      {
        id: 'transferRawManagement',
        title: 'Traslados MP/PP',
        icon: 'fa fa-cart-arrow-down',
        type: 'item',
        url: '/transfers/transfer-management',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "TransferRawMater"
      },
    ]
  },

  {
    id: 'warehouse',
    title: 'Bodegas',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [

      {
        id: 'enlistment-management',
        title: 'Alistamiento',
        icon: 'fa fa-truck-loading',
        type: 'item',
        url: '/warehouse/enlistment-management',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "EnlistmentManag"
      },
      {
        id: 'deallocation-management',
        title: 'Desasignación',
        icon: 'fa fa-backward',
        type: 'item',
        url: '/warehouse/deallocation-management',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "DeallocationMng"
      },
      {
        id: 'return-management',
        title: 'Devoluciones',
        icon: 'fa fa-undo',
        type: 'item',
        url: '/returns/return-management',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "ReturnManag"
      },
      {
        id: 'transfer-pallet',
        title: 'Trasladar Estiba',
        icon: 'fa fa-random',
        type: 'item',
        url: '/warehouse/transfer-pallet',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "TransferPallet"
      },
    ]
  },
  {
    id: 'production',
    title: 'Producción',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'materialsInput',
        title: 'Entrada de Materiales',
        icon: 'fa fa-sign-in-alt',
        type: 'item',
        url: '/production/materialsInput',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "*"
      },
      {
        id: 'requestManagement',
        title: 'Requisiciones',
        icon: 'fa fa-clipboard',
        type: 'item',
        url: '/production/requestManagement',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "*"
      },
      {
        id: 'productionMaster',
        title: 'Etiqueta Master Producción',
        icon: 'fa fa-barcode',
        type: 'item',
        url: '/production/productionMaster',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "*"
      },
      {
        id: 'tagDelivery',
        title: 'Validación Entrega',
        icon: 'fa fa-clipboard-check',
        type: 'item',
        url: '/production/tagDelivery',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "*"
      },
      {
        id: 'reprintUniversalTag',
        title: 'Reimprimir Etiqueta Universal',
        icon: 'fa fa-print',
        type: 'item',
        url: '/production/reprintUniversalTag',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "*"
      },
      {
        id: 'locateproduct',
        title: 'Ubicar Producto en Proceso',
        icon: 'fa fa-pallet',
        type: 'item',
        url: '/production/locateproduct',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "*"
      },
    ]
  },

  {
    id: 'queries',
    title: 'Consultas',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'transferFP',
        title: 'Traslados PT',
        icon: 'feather icon-bar-chart',
        type: 'item',
        url: '/queries/transferFP',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "QueryTransfersPT"
      },
      {
        id: 'queryInternalTag',
        title: 'Etiquetas Internas',
        icon: 'feather icon-bar-chart-2',
        type: 'item',
        url: '/queries/queryInternalTag',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "QueryInternalTag"
      },
      {
        id: 'queryExternalTag',
        title: 'Etiquetas Externas',
        icon: 'feather icon-bar-chart',
        type: 'item',
        url: '/queries/queryExternalTag',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "QueryExternalTag"
      },
      {
        id: 'queryDispatch',
        title: 'Reporte Despacho',
        icon: 'fa fa-file-pdf',
        type: 'item',
        url: '/queries/queryDispatch',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "DispatchReport"
      },
      {
        id: 'queryLocations',
        title: 'Ubicaciones',
        icon: 'feather icon-bar-chart',
        type: 'item',
        url: '/queries/queryLocations',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "QueryLocations"
      },
      {
        id: 'queryReprintTag',
        title: 'Reimpresión',
        icon: 'feather icon-bar-chart',
        type: 'item',
        url: '/queries/queryReprintTag',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "QueryRePrintTag"
      },
      {
        id: 'queryReturn',
        title: 'Devoluciones',
        icon: 'feather icon-bar-chart',
        type: 'item',
        url: '/queries/queryReturn',
        classes: 'nav-item',
        breadcrumbs: false,
        permission: "QueryReturn"
      },
    ]
  },




];

@Injectable()
export class NavigationItem {
  user: User;
  constructor(private authorization: AuthorizationBusinessService) {

  }

  navItems: Navigation[];
  public get() {
    this.navItems = [];
    this.user = this.authorization.GetUser();
    //Revisa Permisos
    NavigationItems.forEach((item) => {
      var newGroup = JSON.parse(JSON.stringify(item));
      newGroup.children = this.getChilds(item.children as Navigation[]);
      if (newGroup.children && newGroup.children.length > 0)
        this.navItems.push(newGroup);
    });

    return this.navItems;
  }

  getChilds(items: Navigation[]): Navigation[] {
    let user = this.authorization.ValidateSession();
    if (!items)
      return null;
    var result: Navigation[] = [];
    items.forEach((item: Navigation) => {
      if (item.permission == "*" || this.user.Profile.Permissions.find(x => x == item.permission)) {
        let newItemNav = item;
        newItemNav.children = this.getChilds(newItemNav.children);
        if (newItemNav.type == "group" && newItemNav.children.length > 0)
          result.push(newItemNav);
        else
          result.push(newItemNav);
      }
    });
    return result;
  }

}
