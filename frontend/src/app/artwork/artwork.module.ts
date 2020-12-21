import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtworkRoutingModule } from './artwork-routing.module';
import { ArtworkListComponent } from './artwork-list/artwork-list.component';
import { ArtworkCardComponent } from './artwork-card/artwork-card.component';
import {SharedModule} from '../shared/shared.module';
import {ArtworkDisplayComponent} from './artwork-display/artwork-display.component';
import { DeleteDialogComponent } from './artwork-display/delete-dialog.component';
import { ArtworkModifyComponent } from './artwork-modify/artwork-modify.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ArtworkRoutingModule
  ],
  declarations: [ArtworkListComponent, ArtworkCardComponent, ArtworkDisplayComponent, DeleteDialogComponent, ArtworkModifyComponent]
})
export class ArtworkModule { }
