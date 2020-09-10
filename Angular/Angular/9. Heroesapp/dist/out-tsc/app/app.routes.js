import { RouterModule } from '@angular/router';
import { HeroesComponent } from "./components/heroes/heroes.component";
import { HeroeComponent } from "./components/heroes/heroe.component";
var app_routes = [
    { path: 'heroes', component: HeroesComponent },
    { path: 'heroe/:id', component: HeroeComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'heroes' }
];
export var APP_ROUTING = RouterModule.forRoot(app_routes);
//# sourceMappingURL=../../../src/app/app.routes.js.map