import { RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { BuscarComponent } from "./components/buscar/buscar.component";
import { PeliculaComponent } from "./components/pelicula/pelicula.component";
var app_routes = [
    { path: 'home', component: HomeComponent },
    { path: 'buscar', component: BuscarComponent },
    { path: 'buscar/:texto', component: BuscarComponent },
    { path: 'pelicula/:id/:pag', component: PeliculaComponent },
    { path: 'pelicula/:id/:pag/:busqueda', component: PeliculaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
export var APP_ROUTING = RouterModule.forRoot(app_routes);
//# sourceMappingURL=../../../src/app/app.routes.js.map