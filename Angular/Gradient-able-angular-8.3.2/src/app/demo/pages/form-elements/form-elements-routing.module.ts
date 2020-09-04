import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        loadChildren: () => import('./basic-elements/basic-elements.module').then(module => module.BasicElementsModule)
      },
      {
        path: 'advance',
        loadChildren: () => import('./frm-advance/frm-advance.module').then(module => module.FrmAdvanceModule)
      },
      {
        path: 'validation',
        loadChildren: () => import('./frm-validation/frm-validation.module').then(module => module.FrmValidationModule)
      },
      {
        path: 'masking',
        loadChildren: () => import('./frm-masking/frm-masking.module').then(module => module.FrmMaskingModule)
      },
      {
        path: 'wizard',
        loadChildren: () => import('./frm-wizard/frm-wizard.module').then(module => module.FrmWizardModule)
      },
      {
        path: 'picker',
        loadChildren: () => import('./frm-picker/frm-picker.module').then(module => module.FrmPickerModule)
      },
      {
        path: 'select',
        loadChildren: () => import('./frm-select/frm-select.module').then(module => module.FrmSelectModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormElementsRoutingModule { }
