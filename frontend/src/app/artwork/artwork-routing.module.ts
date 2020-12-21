import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArtworkListComponent} from './artwork-list/artwork-list.component';
import {ArtworkDisplayComponent} from './artwork-display/artwork-display.component';

const routes: Routes = [
  {path: '', component: ArtworkListComponent},
  {path: ':id', component: ArtworkDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtworkRoutingModule { }
