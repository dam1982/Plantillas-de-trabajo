import { Component, OnInit, ViewChild } from '@angular/core';
import { TransferPalletBusinessService } from 'src/app/business/warehouse/transfer-pallet-business.service';
import { NgForm } from '@angular/forms';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { Location } from 'src/app/model/location';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transfer-pallet',
  templateUrl: './transfer-pallet.component.html',
  styleUrls: ['./transfer-pallet.component.scss']
})
export class TransferPalletComponent implements OnInit {

  @ViewChild('uiForm', { static: false }) uiForm: NgForm;
  onAction: boolean;
  palletTagText:number;
  locations :Location[]=[];
  selectedLocation:Location;
  locationText: any;

  constructor(private business: TransferPalletBusinessService,  private toast: ToastService ) {
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

  UpdateLocation()
  {
    this.business.UpdateLocation(this.palletTagText,this.selectedLocation).then(x=>{
      this.toast.AddToast("Información", "Traslado generado con éxito.", 10, ToastyType.success, true);
      this.Cancel();
    }).catch(x=>{
      Swal.fire("Error", x.message, 'error');
    }).finally(()=> this.onAction=false);
  }

  Cancel()
  {
    this.uiForm.reset();
    this.selectedLocation=null;
    this.GetSuggestedLocations(null);
    this.locationText= null;
    
  }

}
