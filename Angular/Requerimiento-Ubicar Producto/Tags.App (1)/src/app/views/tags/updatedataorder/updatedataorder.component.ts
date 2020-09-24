import { Component, OnInit } from '@angular/core';
//-----------services
import { UpdateDataOrderBusiness } from '../../../business/tags/updatedataorder.service';
//-------------objects
import { Order } from '../../../model/order';
//-----------------------components
import Swal from 'sweetalert2';
import { ToastyType, ToastService } from 'src/app/theme/shared/components/toast/toast.service';

@Component({
  selector: 'app-updatedataorder',
  templateUrl: './updatedataorder.component.html',
  styleUrls: ['./updatedataorder.component.scss']
})
export class UpdateDataOrderComponent implements OnInit {
  orderId:string;
  orderNuevo: Order;
  orderArray: Order[];
  order2: Order;
  CancelImput: boolean = false;
  onAction: boolean = false;
  onSearch: boolean = false;

  public flatWindow: boolean = false;
  constructor(private business: UpdateDataOrderBusiness, private toastService: ToastService) { }
  ngOnInit() { }
  
  async Request(value) {
    if (this.orderId == "") {
      Swal.fire('Atención', 'Debe ingresar número de orden.', 'warning');
      return null;
    }
    this.GetOrders();
    this.CancelImput = true;
  }
  async GetOrders() {
    this.onSearch = true;
    this.orderArray = await this.business.GetOrders(this.orderId);

    var orden0 = this.orderArray[0].OrderLines.sort((x, y) => {
      return x.OrderLineId - y.OrderLineId
    })
    this.orderArray[0].OrderLines = orden0;

    var orden1 = this.orderArray[1].OrderLines.sort((x, y) => {
      return x.OrderLineId - y.OrderLineId
    })


    if (this.orderArray[0].OrderLines.length >= this.orderArray[1].OrderLines.length) {

      if (this.orderArray[0].OrderLines.length <= this.orderArray[1].OrderLines.length) {

        for (var i = 0; i < this.orderArray[1].OrderLines.length; i++) {
          if (this.orderArray[0].OrderLines[i] == null || this.orderArray[0].OrderLines[i].ProductCode != this.orderArray[1].OrderLines[i].ProductCode) {
            let obj: any = this.CreateObject(this.orderArray[1].OrderLines[i].ProductCode)
            this.orderArray[0].OrderLines.splice(i, 0, obj)
          }
        }
      }
      for (var i = 0; i < this.orderArray[0].OrderLines.length; i++) {
        if (this.orderArray[1].OrderLines[i] == null || this.orderArray[1].OrderLines[i].ProductCode != this.orderArray[0].OrderLines[i].ProductCode) {
          let obj: any = this.CreateObject(this.orderArray[0].OrderLines[i].ProductCode)
          this.orderArray[1].OrderLines.push(obj)
        }
      }
    }
    else {
      for (var i = 0; i < this.orderArray[1].OrderLines.length; i++) {
        if (this.orderArray[0].OrderLines[i] == null || this.orderArray[0].OrderLines[i].ProductCode != this.orderArray[1].OrderLines[i].ProductCode) {
          let obj: any = this.CreateObject(this.orderArray[1].OrderLines[i].ProductCode)
          this.orderArray[0].OrderLines.splice(i, 0, obj)
        }

      }
    }


    // codigo ordena por id sin esta parte de codigo ordena por campo de orden de linea
    let items = this.orderArray[1].OrderLines.map(orden => {
      return this.orderArray[0].OrderLines.find(x => x.ProductName === orden.ProductName)

    })

    this.orderArray[0].OrderLines = items;
    //-------------------------------
    this.order2 = this.orderArray[0];
    var cantLine = this.orderArray[0].OrderLines.length;
    this.flatWindow = true;
    this.toastService.AddToast("Operación exitosa", 'Se han cargado ' + cantLine + ' detalles', 10, ToastyType.success, true);
    this.onSearch = false;
  }
  SaveRequest(Observation) {
    if (Observation.value == "") {
      Swal.fire('Atención', 'El campo observaciones es obligatorio', 'warning');
      return null;
    }
    this.onAction = true;

    this.business.UpdateOrder(this.orderId, Observation.value)
    .then(result => {
        this.flatWindow = false;
        this.toastService.AddToast("Operación exitosa", result, 20, ToastyType.success, true);
        this.CancelImput = false;
        this.orderId = '';
    }).catch(x => {
        Swal.fire("Error", x.message, 'error');        
    }).finally(() => {
       this.onAction = false;
    });
    return null;
  }



  Cancel() {
    Swal.fire({
      'title': 'Cancelar',
      'text': "Se dispone a cancelar, ningún cambio será guardado, está seguro?",
      'cancelButtonText': 'No',
      'showCancelButton': true,
      'confirmButtonColor': 'btn-primary',
      'cancelButtonColor': 'btn-secondary',
      'confirmButtonText': 'Si'
    }).then((result) => {
      if (result.value) {
        this.flatWindow = false;
        this.CancelImput = false;
        this.orderId = '';
      }
    });
  }



  CreateObject(productCode: string): any {


    var obj = {
      "OrderLineId": 0,
      "ProductCode": productCode,
      "ProductName": "Sin datos",
      "Quantity": 0,
      "UnitMeasure": "",
      "CuantityUnitsByPackage": 0,
      "CuantityUnitsByBox": 0,
      "CuantitypackageByBox": 0,
      "QuantityPackageByOrder": 0,
      "QuantityBoxByOrder": 0,
      "OderTolerance": 0,
      "PackageTolerance": 0,
      "OrderToleranceByBox": 0,
      "OrderToleranceByPackage": 0,
      "ToleranceByBox": 0,
      "ToleranceByPackage": 0,
      "NumberCopiesPrint": 0,
      "ExpirationYears": 0,
      "ColorTags": "",
      "CodBarint": "",
      "CodBarExt": "",
      "TitleExternalNP": "",
      "TitleExternalEsterilize": ""
    }

    return obj;

  }

}
