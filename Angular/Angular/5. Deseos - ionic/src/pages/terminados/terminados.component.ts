import { Component, OnInit } from '@angular/core';
import { ListaDeseosService } from '../../app/services/lista-deseos.service';

import { NavController } from 'ionic-angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-terminados',
  templateUrl: 'terminados.component.html',
})
export class TerminadosComponent implements OnInit {

  constructor( private _listaDeseos : ListaDeseosService,
              private navCtrl: NavController ) {  }

  ngOnInit() {}


    verDetalle( lista, idx ){
      this.navCtrl.push( DetalleComponent, { lista,idx });
    }
}
