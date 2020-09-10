import { Component } from '@angular/core';
import { MapasService } from "./services/mapas.service";
import { Marcador } from "./interfaces/marcador.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lat: number = 9.976052;
  lng: number = -84.006836;
  zoom:number = 16;

  marcadorSel:any = null;
  draggable:string="1";

  constructor( public _ms:MapasService ){
    this._ms.cargarMarcadores();
  }

  clickMapa( evento ){

    let nuevoMarcador:Marcador ={
      lat: evento.coords.lat,
      lng: evento.coords.lng,
      titulo: "Sin titulo",
      draggable: true
    }

    this._ms.insertarMarcador( nuevoMarcador );

  }

  clickMarcador(marcador:Marcador, i:number){
    console.log(marcador, i);
    this.marcadorSel = marcador;

    if( this.marcadorSel.draggable ){
      this.draggable = "1";
    }else{
      this.draggable = "0";
    }
  }

  cambiarDraggable(){
    console.log(this.draggable);
    if( this.draggable == "1" ){
      this.marcadorSel.draggable = true;
    }else{
      this.marcadorSel.draggable = false;
    }
  }


  dragEndMarcador( marcador:Marcador, evento ){
    // console.log(marcador, evento);
    let lat = evento.coords.lat;
    let lng = evento.coords.lng;

    marcador.lat = lat;
    marcador.lng = lng;

    this._ms.guardarMarcadores();

  }

}
