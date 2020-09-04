import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hd-customer',
  templateUrl: './hd-customer.component.html',
  styleUrls: ['./hd-customer.component.scss']
})
export class HdCustomerComponent implements OnInit {
  public size = 'large-view';
  public showView = false;
  public basicContent: string;

  constructor() { }

  ngOnInit() {
    this.basicContent = '<p>Hello...</p>';
  }

}
