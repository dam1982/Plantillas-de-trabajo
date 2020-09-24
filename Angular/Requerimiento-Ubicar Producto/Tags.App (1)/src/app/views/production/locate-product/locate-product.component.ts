import { Component, OnInit, ViewChild } from '@angular/core';
import { LocateProductBusinessService } from 'src/app/business/production/locate-product-business.service';
import { NgForm } from '@angular/forms';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { Location } from 'src/app/model/location';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-locate-product',
  templateUrl: './locate-product.component.html',
  styleUrls: ['./locate-product.component.scss']
})
export class LocateProductComponent implements OnInit {
  @ViewChild('uiForm', { static: false }) uiForm: NgForm;
  onAction: boolean;
  palletTagText:string;
  locations :Location[]=[];
  selectedLocation:Location;
  locationText: any;
  constructor(private business: LocateProductBusinessService,  private toast: ToastService ) {
    this.GetLocations(null);
  }
  ngOnInit() {
  }
  GetLocations(control: any)
  {    
    if(control)
      control.reset();
    this.onAction = true;
    this.business.GetLocations(control).then(x => {
      this.locations=x;
    }).catch(x=>{
      this.toast.AddToast("Error", "Error cargando datos. " + x.message, 10, ToastyType.error, true);
    }).finally(()=> { this.onAction = false});
  }
  SearchLocation(control)
  {
    this.onAction=true;
    var value = (control.value as string);
    this.business.GetLocations(control.value).then(x=>{
      this.locations=x;      
    }).catch(x=>{
      this.toast.AddToast("Error", "Error cargando datos. " + x.message, 10, ToastyType.error, true);
    }).finally(()=>this.onAction=false);
  }
  UpdateLocation()
  {
  if(this.palletTagText == undefined){
    Swal.fire("Error", "Debe ingresar una etiqueta de estiba." , 'error');
    return;
  }
  if(this.selectedLocation == null){
    Swal.fire("Error", "No se ha seleccionado una ubicación" , 'error');
  }
    this.business.UpdateLocation(this.palletTagText,this.selectedLocation).then(x=>{
      this.toast.AddToast("Información", "Ubicación generado con éxito.", 10, ToastyType.success, true);
      this.Cancel();
    }).catch(x=>{
      Swal.fire("Error", x.message, 'error');
    }).finally(()=> this.onAction=false);
  }
  Cancel()
  {
    this.uiForm.reset();
    this.selectedLocation=null;
    this.GetLocations(null);
    this.locationText= null;
  }
}
