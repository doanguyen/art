import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArtworkListComponent} from './artwork-list/artwork-list.component';

const routes: Routes = [
  {path: '', component: ArtworkListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtworkRoutingModule { }
