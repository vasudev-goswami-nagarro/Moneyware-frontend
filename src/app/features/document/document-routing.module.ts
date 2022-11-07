import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadComponent} from './upload/upload.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'upload-doc',
    pathMatch: 'full'
  },

  {
    path: 'upload-doc',
    component: UploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
