import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hd-ticket',
  templateUrl: './hd-ticket.component.html',
  styleUrls: ['./hd-ticket.component.scss']
})
export class HdTicketComponent implements OnInit {
  public basicContent: string;

  constructor() { }

  ngOnInit() {
    this.basicContent = '<p>Hello...</p>';
  }

}
