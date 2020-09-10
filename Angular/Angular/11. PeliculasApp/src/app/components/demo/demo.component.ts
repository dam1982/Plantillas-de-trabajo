import { Component, OnInit } from '@angular/core';
import { PeliculasService } from "../../services/peliculas.service";


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {

  peliculas:any;

  constructor(public _ps:PeliculasService) {

    this._ps.getPopulares()
      .subscribe( pelis=>{
        console.log(pelis);
        this.peliculas = pelis.results;
      })

  }

  ngOnInit() {
  }

}
