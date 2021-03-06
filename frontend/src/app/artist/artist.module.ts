import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ArtistListComponent],
  imports: [CommonModule, SharedModule, ArtistRoutingModule]
})
export class ArtistModule {}
