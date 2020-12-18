import {Component, OnInit} from '@angular/core';
import {ArtworkService} from '../../services/artwork.service';
import {Observable} from 'rxjs';
import {Artwork} from '../../models';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit {
  artworks$: Observable<Artwork[]>;

  constructor(private artworkService: ArtworkService) {
  }

  ngOnInit(): void {
    this.artworks$ = this.artworkService.artworks$;
    this.artworkService.fetch_artworks();
  }

}
