import {EventEmitter, Injectable, Output} from '@angular/core';
import { ToastyService, ToastOptions } from 'ng2-toasty';
interface Toast {
  id: string;
  delay: number;
}

@Injectable()
export class ToastService {
  @Output() toggleToast: EventEmitter<Toast> = new EventEmitter();
  constructor(private toastyService: ToastyService) { }

  toast(event) {
    this.toggleToast.emit(event);
  }

  AddToast (title,message,timeout,type:ToastyType,closeOther){
    if (closeOther) {
      this.toastyService.clearAll();
    }

    const toastOptions: ToastOptions = {
      title: title,
      msg: message,
      showClose: true,
      timeout: timeout*1000,
      theme: 'bootstrap',      
    };

    switch (type) {
      case ToastyType.default: this.toastyService.default(toastOptions); break;
      case ToastyType.info: this.toastyService.info(toastOptions); break;
      case ToastyType.success: this.toastyService.success(toastOptions); break;
      case ToastyType.wait: this.toastyService.wait(toastOptions); break;
      case ToastyType.error: this.toastyService.error(toastOptions); break;
      case ToastyType.warning: this.toastyService.warning(toastOptions); break;
    }
  }
}


export enum ToastyType
{
  default,
  info,
  success,
  wait,
  error,
  warning

}
