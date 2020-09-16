import { Component, OnInit, EventEmitter, ViewChild, Output, ElementRef } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { EnlistmentBoxes } from 'src/app/model/enlistment-boxes';
import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { DeallocateBusinessService } from 'src/app/business/warehouse/deallocate-business.service';
import { DeallocationDetail } from 'src/app/model/deallocation-detail';

@Component({
  selector: 'app-deallocate',
  templateUrl: './deallocate.component.html',
  styleUrls: ['./deallocate.component.scss']
})
export class DeallocateComponent implements OnInit {

  @Output() finishEvent = new EventEmitter<boolean>();
  gridMapper: GridMapper<DeallocationDetail>;
  @ViewChild('ModalWindow', { static: false }) modalWindow: any;
  @ViewChild('Tag', { static: false }) TagInput: ElementRef;

  FieldTag: string;
  ObservationsModal: string;
  onActionConfirm: boolean = false;
  onActionSave: boolean = false;
  infoQuantity: any;

  constructor(public business: DeallocateBusinessService, private toast: ToastService) {
    this.gridMapper = new GridMapper();
    this.infoQuantity = new Object();
  }

  ngOnInit() {
  }

  async LoadComponent() {
    this.ObservationsModal = "";
    this.FieldTag = "";
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
    let tipo = this.business.CurrentDeallocation.StorageTypeName;
    if (tipo === "Estiba") {
      this.gridMapper.Columns = [
        { prop: 'PalletNumber', maxWidth: 100, name: 'Estiba' },
        { prop: 'LocationName', name: 'Ubicación', canAutoResize: true },
        { prop: 'Quantity', maxWidth: 150, name: 'Cant Unidades' }
      ];
    } else if (tipo === "Caja") {
      this.gridMapper.Columns = [
        { prop: 'BoxNumber', maxWidth: 100, name: "Caja" },
        { prop: 'PalletNumber', maxWidth: 100, name: 'Estiba' },
        { prop: 'LocationName', name: 'Ubicación', canAutoResize: true },
        { prop: 'Quantity', maxWidth: 150, name: 'Cant Unidades' }
      ];
    } else if (tipo === "Paquete") {
      this.gridMapper.Columns = [
        { prop: 'PackageNumber', maxWidth: 150, name: "Nro Paquete" },
        { prop: 'Quantity', name: 'Cant Unidades', canAutoResize: true }
      ];

    }
    this.ReloadItems();
    this.gridMapper.DisplayRows = this.business.CurrentDeallocation.Details;
  }


  ReloadItems() {
    let split = this.business.CurrentDeallocation.Numeration.split("-");
    if (split.length > 1) {
      let [ini, f] = split;
      let inicio = parseInt(ini);
      let fin = parseInt(f.split(",")[0]);
      this.infoQuantity.Items = (fin - inicio) + 1;
    } else {
      this.infoQuantity.Items = 1;
    }
    this.infoQuantity.ItemsToConfirm = this.business.CurrentDeallocation.Details.length;
  }

  SaveDeallocation() {
    if (this.FieldTag == "") {
      Swal.fire('Advertencia', "Por favor ingrese el campo etiqueta antes de confirmar.", 'warning');
      this.TagInput.nativeElement.focus();
      return false;
    }

    this.onActionConfirm = true;
    this.business.SaveDeallocation(this.business.CurrentDeallocation.DeallocationNumber, this.FieldTag).then(x => {
      this.business.CurrentDeallocation.Details = x;
      this.gridMapper.DisplayRows = this.business.CurrentDeallocation.Details;
      this.ReloadItems();
      this.toast.AddToast("Éxito", "Se desasignó correctamente", 10, ToastyType.success, true);
      
    }).catch(x => {
      Swal.fire('Error de etiqueta', "" + x, 'warning').then(x=>
        {
          this.TagInput.nativeElement.focus();
        });
    }).finally(() => {
      this.onActionConfirm = false;
      this.TagInput.nativeElement.focus();
      this.TagInput.nativeElement.pristine
      this.FieldTag ="";
    });
  }


  FinishDeallocation() {
    if (this.infoQuantity.ItemsToConfirm !== 0) {
      Swal.fire('Advertencia', "Deben estar confirmadas todas las etiquetas de deasignación antes de terminar.", 'warning');
      return;
    }
    this.onActionSave = true;

    this.business.FinishDeallocation(this.business.CurrentDeallocation.DeallocationNumber, this.ObservationsModal).then(x => {
      if (x) {
        this.toast.AddToast("Éxito", "Se realizó correctamente.", 10, ToastyType.success, true);
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
}
