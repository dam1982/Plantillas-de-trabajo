import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-inbox',
  templateUrl: './mail-inbox.component.html',
  styleUrls: ['./mail-inbox.component.scss']
})
export class MailInboxComponent implements OnInit {
  public isCollapsed: boolean;
  public isMail: string;
  public isSubMail: string;

  constructor() {
    this.isCollapsed = false;
    this.isMail = 'inbox';
    this.isSubMail = 'primary';
  }

  ngOnInit() {
  }

}
