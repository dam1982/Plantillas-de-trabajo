import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { UniversalTag } from 'src/app/model/universal-tag';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { User } from 'src/app/model/user';
import { TemplateType } from 'src/app/model/template-type.enum';

@Component({
  selector: 'app-universal-tag-preview',
  templateUrl: './universal-tag-preview.component.html',
  styleUrls: ['./universal-tag-preview.component.scss']
})
export class UniversalTagPreviewComponent implements OnInit {

  @ViewChild('ModalWindow', { static: false }) public modalWindow: any;
  CurrenUniversalTag: UniversalTag =new UniversalTag();
  @Output() Print = new EventEmitter<boolean>();
  user: User;
  enumTemplateType = TemplateType;
  public onActionPrint: boolean = false;
  constructor() {

    this.enumTemplateType.UniversalGrande
    this.user = AppEnviroment.User;
  }

  ngOnInit() {
  }

  PrintTag() {
    this.Print.emit(true);
    this.onActionPrint = true;
  }

  LoadComponent(universalTag: UniversalTag) {
    this.CurrenUniversalTag = universalTag;
    this.modalWindow.show();
  }

  CancelModal() {
    this.modalWindow.hide();
    this.CurrenUniversalTag = new UniversalTag();
  }


}
