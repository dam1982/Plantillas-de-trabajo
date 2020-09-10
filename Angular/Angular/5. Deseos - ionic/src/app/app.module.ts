import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Servicios
import { ListaDeseosService } from './services/lista-deseos.service';

// Pipes
import { PlaceHolderPipe } from './pipes/placeholder.pipe';
import { PendientesPipe } from './pipes/pendientes.pipes';

import { TabsPage } from '../pages/tabs/tabs';

import { PendientesComponent } from '../pages/pendientes/pendientes.component';
import { TerminadosComponent } from '../pages/terminados/terminados.component';
import { AgregarComponent } from '../pages/agregar/agregar.component';
import { DetalleComponent } from '../pages/detalle/detalle.component';

@NgModule({
  declarations: [
    MyApp,
    PlaceHolderPipe,
    PendientesPipe,
    PendientesComponent,
    TerminadosComponent,
    PendientesComponent,
    AgregarComponent,
    DetalleComponent,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PendientesComponent,
    TerminadosComponent,
    PendientesComponent,
    AgregarComponent,
    DetalleComponent,
    TabsPage
  ],
  providers: [
    ListaDeseosService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
