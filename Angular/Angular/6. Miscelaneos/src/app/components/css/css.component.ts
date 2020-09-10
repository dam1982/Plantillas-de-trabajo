import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-css',
  template: `
    <p>
      css Works!
    </p>
  `,
  styles: [ `
    p {
      font-size: 20px;
    }
  ` ]
})
export class CssComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
