import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ArtworkModule} from './artwork/artwork.module';
import {ArtistModule} from './artist/artist.module';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'artworks', loadChildren: (): Promise<ArtworkModule> => import('./artwork/artwork.module').then(m => m.ArtworkModule) },
  {path: 'artists', loadChildren: (): Promise<ArtistModule> => import('./artist/artist.module').then(m => m.ArtistModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
