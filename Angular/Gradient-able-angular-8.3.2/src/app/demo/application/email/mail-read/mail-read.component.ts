import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-read',
  templateUrl: './mail-read.component.html',
  styleUrls: ['./mail-read.component.scss']
})
export class MailReadComponent implements OnInit {
  public isCollapsed: boolean;

  constructor() {
    this.isCollapsed = false;
  }

  ngOnInit() {
  }

}
