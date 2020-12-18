import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtworkRoutingModule } from './artwork-routing.module';
import { ArtworkListComponent } from './artwork-list/artwork-list.component';


@NgModule({
  imports: [
    CommonModule,
    ArtworkRoutingModule
  ],
  declarations: [ArtworkListComponent]
})
export class ArtworkModule { }
