import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { Location } from 'src/app/model/Location';
import { LocationBusinessService } from 'src/app/business/administration/location-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  gridMapper: GridMapper<Location>;
  @ViewChild('RackTemplate', { static: true }) RackTemplate: TemplateRef<any>;
  @ViewChild('RowTemplate', { static: true }) RowTemplate: TemplateRef<any>;
  @ViewChild('ColumnTemplate', { static: true }) ColumnTemplate: TemplateRef<any>;
  @ViewChild('SideTemplate', { static: true }) SideTemplate: TemplateRef<any>;
  @ViewChild('LocationNameTemplate', { static: true }) LocationNameTemplate: TemplateRef<any>;
  @ViewChild('SwitchTemplate', { static: true }) switchTemplate: TemplateRef<any>;
  @ViewChild('ActionsTemplate', { static: true }) actionsTemplate: TemplateRef<any>;
  editing = {};
  activeEdit: boolean = false;
  constructor(private business: LocationBusinessService, private toast: ToastService) {
  this.gridMapper = new GridMapper();
  }
  ngOnInit() {
    this.gridMapper.Columns = [
      { prop: 'Rack', name: "Mueble", maxWidth: 300, minWidth: 300, cellTemplate: this.RackTemplate },
      { prop: 'Row', maxWidth: 250, name: "Fila", cellTemplate: this.RowTemplate },
      { prop: 'Column', maxWidth: 250, name: "Columna", cellTemplate: this.ColumnTemplate },
      { prop: 'Side', maxWidth: 250, name: "Lado", cellTemplate: this.SideTemplate },
      { prop: 'LocationName', maxWidth: 250, name: "Ubicación", cellTemplate: this.LocationNameTemplate },
      { prop: 'Active', maxWidth: 150, name: 'Activo', cellTemplate: this.switchTemplate },
      { prop: '', name: '', canAutoResize: true, cellTemplate: this.actionsTemplate }
    ];
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
    this.GetLocations("");
  }
  GetLocations(LocationsName: string) {
  this.business.GetLocations(LocationsName).then(x => {
      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
    
  }
SaveChanges(rowIndex) {
let msgError = '';
const Rack = this.gridMapper.DisplayRows[rowIndex]['Rack'] === '';
const Row = this.gridMapper.DisplayRows[rowIndex]['Row'] === '';
const Column = this.gridMapper.DisplayRows[rowIndex]['Column'] === '';
const Side = this.gridMapper.DisplayRows[rowIndex]['Side'] === '';
if (Rack) {
  msgError += "Ingrese un Rack <br>", 'error';
}
if (Row) {
  msgError += "Ingrese una Fila <br>", 'error';
}
if (Column) {
  msgError += "Ingrese una Columna <br>", 'error';
}
if (Side) {
  msgError += "Ingrese un Lado <br>", 'error';
}
if (msgError !== '') {
  Swal.fire('Error', msgError, 'error');
  return;
}
  this.editing[rowIndex] = false;
  this.activeEdit = false;
  this.toast.AddToast("Info", "Guardando...", 10, ToastyType.info, true);
  this.business.SaveLocation(this.gridMapper.DisplayRows[rowIndex]).then(x => {
  
    if (x) {
      this.toast.AddToast("Éxito", "Se guardó correctamente", 10, ToastyType.success, true);
    } else {
      this.toast.AddToast("Error", "No se pudo guardar la impresora", 10, ToastyType.error, true);
    }
  }).catch(x => {
    Swal.fire('Error', "" + x, 'error');
  }).finally(() => {
    this.GetLocations("");
  });
}
NewLocation(isDuplicated: boolean) {
 
  let location: Location = new Location();
  if (isDuplicated) {
    if (this.gridMapper.SelectedRows.length == 0)
      return;
    Object.assign(location, this.gridMapper.SelectedRows[0]);
    location.LocationName = location.LocationName + " Copia";
  } else {
    location = {
      LocationId : 0,
      Rack : "",
      Row: "",
      Column: "",
      Side: "",
      LocationName: "",
      Active: false 
    }
  }
  if (this.gridMapper.DisplayRows == undefined) {
    this.gridMapper.DisplayRows = [location];
  } else {
    this.gridMapper.DisplayRows = [location, ...this.gridMapper.DisplayRows];
  }
  this.gridMapper.SelectedRows = [];
  this.editing[0] = true;
  this.activeEdit = true;
}
updateValue(event, cell, rowIndex) {
  if (cell !=='Active') {
    this.gridMapper.DisplayRows[rowIndex][cell] = event.target.value;
    this.gridMapper.DisplayRows[rowIndex].LocationName = "M" +
    this.gridMapper.DisplayRows[rowIndex].Rack +
    this.gridMapper.DisplayRows[rowIndex].Row +
    this.gridMapper.DisplayRows[rowIndex].Column +
    this.gridMapper.DisplayRows[rowIndex].Side 
  } else {
    this.gridMapper.DisplayRows[rowIndex][cell] = !(this.gridMapper.DisplayRows[rowIndex][cell] as boolean);
    
  }
  this.gridMapper.DisplayRows = [...this.gridMapper.DisplayRows];
}

CancelLocation(){
  this.GetLocations("");
  this.editing = {}; this.activeEdit=false;
}
}