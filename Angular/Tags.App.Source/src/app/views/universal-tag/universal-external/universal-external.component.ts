import { Component, OnInit } from '@angular/core';
import { UniversalTagBusinessService } from 'src/app/business/universal-tag/universal-tag-business.service';
import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { UniversalExternalTagBusinessService } from 'src/app/business/universal-tag/universal-external-tag-business.service';

@Component({
  selector: 'app-universal-external',
  templateUrl: './universal-external.component.html',
  styleUrls: ['./universal-external.component.scss']
})
export class UniversalExternalComponent implements OnInit {


  rePrintCheck: boolean = false;
  universalTagText: string = "";
  externalTagText: string = "";
  universalTags: number[] = [];
  onAction: boolean = false;


  constructor(public business: UniversalExternalTagBusinessService,  private toast: ToastService) {
    //this.rePrint = AppEnviroment.User.Profile.Permissions.indexOf("RePrintExtTag") != -1;
  }

  ngOnInit() {

  }


  async AddUniversalTag() {

    var values = (this.universalTagText).split('-');
    try {
      if (values.length != 3)
        throw "La etiqueta ingresada no tiene un formato válido. Ejemplo: 5-5A02000462-0";

      if (this.universalTags.indexOf(Number(values[0])) > 0)
        throw "La etiqueta ingresada ya fue leída.";

      this.SaveTag(Number(values[0]));
    } catch (error) {
      Swal.fire('Error', error, 'error');
      this.universalTagText = "";
    }
  }

  SaveTag(value: number) {
    this.universalTags.push(value);
    this.universalTags = this.universalTags.sort();
    this.universalTagText = "";
  }

  GenerateTag(){
    this.onAction = true;

    try{
      if(this.universalTags.length === 0) throw "Debe ingresar por lo menos una etiqueta.";
      if(this.rePrintCheck && this.externalTagText === '') throw "Si activa la reimpresión debe ingresar la etiqueta externa.";
    }catch(error){
      Swal.fire('Error', error, 'error');
    }

    if(this.rePrintCheck){
      this.business.ReprintTags(this.externalTagText,this.universalTags).then(x => {
        this.toast.AddToast("Información", "Etiqueta generada con éxito con el identificador "+x, 10, ToastyType.success, true);
        this.Reset();
      }).catch(x => {
        Swal.fire("Error", x.message, 'error');
      }).finally(() => {
        this.onAction = false;
      });
    }else{
      this.business.SaveTags(this.universalTags).then(x => {
        this.toast.AddToast("Información", "Etiqueta generada con éxito con el identificador "+x, 10, ToastyType.success, true);
        this.Reset();
    }).catch(x => {
      Swal.fire("Error", x.message, 'error');
    }).finally(() => {
      this.onAction = false;
    });

    }
  }


  Cancel() {
    Swal.fire({
      title: "Confirmar Acción",
      text: "Se dispone a cancelar, las lecturas realizadas se perderán, está seguro?",
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.dismiss)
        return;
      this.Reset();

    });
  }

  Reset() {
    this.universalTags = [];
    this.universalTagText = null;
    this.externalTagText ='';
  }

}
