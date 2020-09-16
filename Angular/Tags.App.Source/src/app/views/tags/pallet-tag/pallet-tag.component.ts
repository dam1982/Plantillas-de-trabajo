import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { PalletTagBusinessService, PalletError, PalletErrorType } from 'src/app/business/tags/pallet-tag-business.service';
import { Location} from '../../../model/location';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pallet-tag',
  templateUrl: './pallet-tag.component.html',
  styleUrls: ['./pallet-tag.component.scss']
})
export class PalletTagComponent implements OnInit {


  @ViewChild('uiForm', { static: false }) uiForm: NgForm;
  externalTags: number[]=[];
  displayTags :string[]=[];
  locations :Location[]=[];
  selectedLocation:Location;
  rePrintCheck: boolean = false;
  externalTagText:string=null;
  onAction: boolean;
  locationText: any;

  constructor(private business: PalletTagBusinessService,  private toast: ToastService) {
    this.GetSuggestedLocations(null);
  }
  ngOnInit() {

  }

  GetSuggestedLocations(control)
  {    
    if(control)
      control.reset();
    this.onAction = true;
    this.business.GetSuggestedLocations().then(x=>{
      this.locations=x;
     
    }).catch(x=>{
      this.toast.AddToast("Error", "Error cargando datos. " + x.message, 10, ToastyType.error, true);
    }).finally(()=> { this.onAction = false});
  }

  AddExternalTag()
  {
        
    var tag = this.externalTagText;
    var values = tag.split('-');
    try {
      if (values.length != 4)
        throw new Error("La etiqueta ingresada no tiene un formato válido");

      if (this.displayTags.indexOf(tag) != -1)
        throw new Error("La etiqueta ingresada ya fue leída.");

      this.SaveTag(Number(values[1]),tag);
      
    } catch (error) {
      Swal.fire("Error", error.message, 'error');
      this.externalTagText = "";
    }
  }

  SaveTag(value: number, tag:string) {
    this.externalTags.push(value);
    this.displayTags.push(tag);
    this.externalTagText = "";
  }

  SearchLocation(control)
  {
    this.onAction=true;
    var value = (control.value as string);
    this.business.GetLocations({LocationName:value}).then(x=>{
      this.locations=x;      
    }).catch(x=>{
      this.toast.AddToast("Error", "Error cargando datos. " + x.message, 10, ToastyType.error, true);
    }).finally(()=>this.onAction=false);
  }


  SaveTags()
  {    
    this.onAction = true;
    this.business.SaveTags(this.externalTags,this.selectedLocation,this.rePrintCheck)
    .then(x=>{
      this.toast.AddToast("Información", "Etiqueta generada con éxito.", 10, ToastyType.success, true);     
      this.Cancel();
    }).catch(x=>{
      Swal.fire("Error", x.message, 'error');
      if((x as PalletError).type != PalletErrorType.Location)
        this.Cancel();
    }).finally(()=> {
      this.onAction=false;      
    });
  }

  Cancel()
  {
    this.uiForm.reset();
    this.externalTags=[];
    this.displayTags=[];
    this.selectedLocation=null;
    this.rePrintCheck = false;
    this.GetSuggestedLocations(null);
    this.locationText= null;
    
  }
}
