import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { ReturnPackages } from 'src/app/model/return-packages';
import { GridMapper } from 'src/app/model/grid-mapper';
import { ReturnBusinessService } from 'src/app/business/returns/return-business.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  @Output() finishEvent = new EventEmitter<boolean>();
  gridMapper: GridMapper<ReturnPackages>;
  @ViewChild('ModalWindow', { static: false }) modalWindow: any;
  @ViewChild('switchTemplate', { static: true }) switchTemplate: TemplateRef<any>;
  @ViewChild('Tag', { static: false }) TagInput: ElementRef;
  FieldTag: string;
  ObservationsModal: string;
  onActionConfirm: boolean = false;
  onActionSave: boolean = false;
  infoQuantity: any;

  constructor(public business: ReturnBusinessService, private toast: ToastService) {
    this.gridMapper = new GridMapper();
    this.infoQuantity = new Object();
  }

  ngOnInit() {
    this.gridMapper.Columns = [
      { prop: 'PackageNumber', maxWidth: 80, name: "Nro Paquete" },
      { prop: 'BoxNumber', maxWidth: 80, name: "Caja" },
      { prop: 'PalletNumber', maxWidth: 80, name: 'Estiba' },
      { prop: 'LocationName',minWidth: 150, maxWidth: 150, name: 'Ubicación', canAutoResize: true },
      { prop: 'Enlisted',minWidth : 150, maxWidth: 150, name: 'Alistado', cellTemplate: this.switchTemplate }
    ];
  }


  LoadComponent(returnNumber: number) {

    this.modalWindow.title = "Devolución";
    this.business.GetReturn(returnNumber).then(x => {
      this.ReloadItems();
      this.modalWindow.show();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });

    this.ObservationsModal = "";
    this.FieldTag = "";



  }


  ReloadItems() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
    this.gridMapper.DisplayRows = this.business.CurrentReturn.Packages;

    this.infoQuantity.Items = this.business.CurrentReturn.Packages.length;
    this.infoQuantity.ItemsConfirm = 0;
    this.business.CurrentReturn.Packages.forEach(x => {
      this.infoQuantity.ItemsConfirm += x.Returned ? 1 : 0;
    });
  }

  SaveReturn() {
    if (this.FieldTag == "") {
      Swal.fire('Advertencia', "Por favor ingrese etiqueta antes de confirmar.", 'warning');
      this.TagInput.nativeElement.focus();
      return false;
    }

    this.onActionConfirm = true;

    this.business.SaveReturn(this.business.CurrentReturn.ReturnNumber, this.FieldTag).then(x => 
    {
      this.ReloadItems();
      this.toast.AddToast("Éxito", "Se devolvió correctamente", 10, ToastyType.success, true);

    }).catch(x => {
      Swal.fire('Error de etiqueta', "" + x, 'warning').then()
      {
        this.TagInput.nativeElement.focus();
      };       
    }).finally(() => {
      this.onActionConfirm = false;
      this.TagInput.nativeElement.focus();
      this.FieldTag= "";
    });
  }


  FinishReturn() {
    if (this.infoQuantity.ItemsConfirm !== this.infoQuantity.Items) {
      Swal.fire('Advertencia', "Deben estar confirmadas todas las etiquetas antes de terminar la devolución.", 'warning');
      return;
    }
    this.onActionSave = true;

    this.business.FinishReturn(this.business.CurrentReturn.ReturnNumber, this.ObservationsModal).then(x => {
      if (x) {
        this.toast.AddToast("Éxito", "Se terminó correctamente.", 10, ToastyType.success, true);
      } else {
        this.toast.AddToast("Error", "No se pudo terminar el alistamiento", 10, ToastyType.error, true);
      }
      this.Finish();
    }).catch(x => {
      Swal.fire('Error', "" + x, 'warning');
    }).finally(() => {
      this.onActionSave = false;
    });
  }

  Finish() {
    this.modalWindow.hide();
    this.finishEvent.emit(true);
  }
  getRowClass(row: ReturnPackages) {
    return { 'green-row': row.Returned };
  }
}
