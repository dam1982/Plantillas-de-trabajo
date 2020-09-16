import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { Frame } from 'src/app/model/frame';
import { FrameBusinessService } from 'src/app/business/administration/frame-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import Swal from 'sweetalert2';
import { KeyValuePair } from "../../../model/key-value-pair";
@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  gridMapper: GridMapper<Frame>;
  @ViewChild('IdTemplate', { static: true }) IdTemplate: TemplateRef<any>;
  @ViewChild('CodeTemplate', { static: true }) CodeTemplate: TemplateRef<any>;
  @ViewChild('SwitchTemplate', { static: true }) switchTemplate: TemplateRef<any>;
  @ViewChild('DimensionsIdTemplate', { static: true }) DimensionsIdTemplate: TemplateRef<any>;
  @ViewChild('ActionsTemplate', { static: true }) actionsTemplate: TemplateRef<any>;
  editing = {};
  activeEdit: boolean = false;
  selectTitle: KeyValuePair[];
  frame: Frame = new Frame();
  constructor(private business: FrameBusinessService, private toast: ToastService) {
    this.gridMapper = new GridMapper();
    this.ListDimensions();
  }
  ngOnInit() {
    this.gridMapper.Columns = [
      { prop: 'Id', name: "Id", maxWidth: 100, minWidth: 100, cellTemplate: this.IdTemplate },
      { prop: 'Code', minWidth: 250, maxWidth: 250, name: "Número", cellTemplate: this.CodeTemplate },
      { prop: 'Active', minWidth: 150, maxWidth: 150, name: 'Activo', cellTemplate: this.switchTemplate },
      { prop: 'DimensionsName', minWidth: 250, maxWidth: 250, name: "Dimensiones", cellTemplate: this.DimensionsIdTemplate },
      { prop: '', name: '', canAutoResize: true, cellTemplate: this.actionsTemplate }
    ];
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
    this.GetFrames();
  }
  GetFrames() {
    this.business.GetFrames().then(x => {
      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
  }

  NewLocation(isDuplicated: boolean) {
   
    let frame: Frame = new Frame();
    if (isDuplicated) {
      if (this.gridMapper.SelectedRows.length == 0)
        return;
        this.gridMapper.SelectedRows[0].Id = 0;
      Object.assign(frame, this.gridMapper.SelectedRows[0]);
      this.frame.DimensionsId = this.gridMapper.SelectedRows[0].DimensionsId;
      this.frame.DimensionsName = this.gridMapper.SelectedRows[0].DimensionsName;
      this.frame.Code = this.gridMapper.SelectedRows[0].Code;
      this.frame.Id = 0;
      this.frame.Active = this.gridMapper.SelectedRows[0].Active;
    } else {
      frame = {
        Id: 0,
        Code: "",
        DimensionsName: "",
        DimensionsId: 0,
        Active: false
      }
      this.frame.DimensionsId = 0;
    }
    if (this.gridMapper.DisplayRows == undefined) {
      this.gridMapper.DisplayRows = [frame];
    } else {
      this.gridMapper.DisplayRows = [frame, ...this.gridMapper.DisplayRows];
    }
    this.gridMapper.SelectedRows = [];
    this.editing[0] = true;
    this.activeEdit = true;
  }

  SaveChanges(rowIndex) {
    
    let msgError = '';
    const Code = this.gridMapper.DisplayRows[rowIndex]['Code'];
    const DimensionsId = this.gridMapper.DisplayRows[rowIndex]['DimensionsId'];


    if ( Code == "" || DimensionsId == 0) {
      msgError += "Todos los campos son requeridos <br>", 'error';
    }

    if (msgError !== '') {
      Swal.fire('Error', msgError, 'error');
      return;
    }

    this.editing[rowIndex] = false;
    this.activeEdit = false;
    this.toast.AddToast("Info", "Guardando...", 10, ToastyType.info, true);
    this.business.SaveFrame(this.gridMapper.DisplayRows[rowIndex]).then(x => {
      if (x) {
        this.toast.AddToast("Éxito", "Se guardó correctamente", 10, ToastyType.success, true);
      } else {
        this.toast.AddToast("Error", "No se pudo guardar la impresora", 10, ToastyType.error, true);
      }
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(() => {
      this.GetFrames();
      this.editing = {}; this.activeEdit = false;
    });
    this.gridMapper.DisplayRows[rowIndex]['Id'] = 0;
    this.gridMapper.DisplayRows[rowIndex]['Code'] = "";
    this.gridMapper.DisplayRows[rowIndex]['DimensionsId'] = 0;
    this.gridMapper.DisplayRows[rowIndex]['DimensionsName'] = "";
  }

  updateValue(event, cell, rowIndex) {

    if (cell !== 'Active') {
      if (cell == "DimensionsId") {
        this.gridMapper.DisplayRows[rowIndex][cell] = event.Key;
        this.gridMapper.DisplayRows[rowIndex]['DimensionsName'] = event.Value;
        this.frame.DimensionsName = event.Value;
      }
      else {
        this.gridMapper.DisplayRows[rowIndex][cell] = event.target.value;
      }

    } else {
      this.gridMapper.DisplayRows[rowIndex][cell] = !(this.gridMapper.DisplayRows[rowIndex][cell] as boolean);

    }
    this.gridMapper.DisplayRows = [...this.gridMapper.DisplayRows];

  }
  CancelFrames() {
    this.GetFrames();
    this.editing = {}; this.activeEdit = false;
  }
  ListDimensions() {
    this.business.GetDimensions().then(x => {
      this.selectTitle = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
  }
  initSelect() {
    if(this.gridMapper.SelectedRows.length > 0)
    this.frame.DimensionsId = this.gridMapper.SelectedRows[0].DimensionsId;
  }
}