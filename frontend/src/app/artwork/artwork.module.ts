import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtworkRoutingModule } from './artwork-routing.module';
import { ArtworkListComponent } from './artwork-list/artwork-list.component';
import { ArtworkCardComponent } from './artwork-card/artwork-card.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ArtworkRoutingModule
  ],
  declarations: [ArtworkListComponent, ArtworkCardComponent]
})
export class ArtworkModule { }
