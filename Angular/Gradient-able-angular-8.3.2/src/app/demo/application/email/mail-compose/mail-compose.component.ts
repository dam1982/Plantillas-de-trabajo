import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-compose',
  templateUrl: './mail-compose.component.html',
  styleUrls: ['./mail-compose.component.scss']
})
export class MailComposeComponent implements OnInit {
  public isCollapsed: boolean;
  public basicContent: string;

  constructor() {
    this.isCollapsed = false;
    this.basicContent = '<p>Put your things hear...</p>';
  }

  ngOnInit() {
  }

}
