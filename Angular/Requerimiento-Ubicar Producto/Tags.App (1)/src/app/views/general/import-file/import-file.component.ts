import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { ImportTask } from 'src/app/model/import-task';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer'
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { state } from '@angular/animations';


@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.scss']
})
export class ImportFileComponent implements OnInit {

  private _importaTask: ImportTask;

  get importTask(): ImportTask { 
    return this._importaTask;
  }

  @Input() 
  set importTask(val: ImportTask) {
    this._importaTask = val;
    if(!val)
      return ;
    if(this._importaTask.State == 0)
    {
      this.btnDisable = true;
      this.addToast({ title: 'Subiendo', msg: 'Se esta procesando el archivo. Por favor, espere unos minutos para obtener el resultado de la importación.', timeout: 2000, theme: 'default', position: 'bottom-right', type: 'wait' })
    }else 
    {
      this.btnDisable = false;     
    }

    this.changeState(this._importaTask.State);
  }
  
  
  
  @Output() buttonDownloadTemplate = new EventEmitter();
  @Output() buttonDownloadData = new EventEmitter();
  @Output() buttonUpload = new EventEmitter<File>();
  btnDisable = false;
  fileToUpload: File = null;
  stateUpload: string = "info";
  alive = true;

  constructor(private toastyService: ToastyService) { }


  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  async UploadFile() {
    
    if (!this.fileToUpload) {
      Swal.fire('', 'No hay archivo, por favor adjunte uno.', 'warning');
      return;
    }

    if (this.fileToUpload.size > 8388608) {
      Swal.fire('', 'El tamaño del archivo debe ser inferior de 8MB.', 'warning');
      return;
    }

    if (this.fileToUpload.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && this.fileToUpload.type != "application/vnd.ms-excel") {
      Swal.fire('', 'El archivo deber ser un documento de Excel.', 'warning');
      return;
    }
    await this.buttonUpload.emit(this.fileToUpload);
    this.importTask = { Code:"", Edition:"",Log:"Cargando...",Start:null,End:null, TaskId:"", State: 0} ;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  changeState(mode: number) {
    switch (mode) {
      case 0:
        this.stateUpload = 'warning';
        break;
      case 1:
        this.addToast({ title: 'Correcto', msg: 'Se ha realizado la importación.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' })
        this.stateUpload = 'success';
        break;
      case 2:
        this.addToast({ title: 'Fallo', msg: 'No se ha podido importar el archivo.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
        this.stateUpload = 'danger';
        break;
    }
  }

  addToast(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }

    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    

    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }
  clickDownloadTemplate ()
  {
    this.buttonDownloadTemplate.emit();
  }

  clickDownloadData ()
  {
    this.buttonDownloadData.emit();
  }

}
