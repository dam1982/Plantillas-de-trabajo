import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { USUARIO_ROUTES } from './components/usuario/usuario.routes';
var APP_ROUTES = [
    { path: 'home', component: HomeComponent },
    {
        path: 'usuario/:id',
        component: UsuarioComponent,
        children: USUARIO_ROUTES
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
export var APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=../../../src/app/app.routes.js.map