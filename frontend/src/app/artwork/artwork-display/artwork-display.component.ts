import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Artwork} from '../../models';
import {switchMap} from 'rxjs/operators';
import {ArtworkService} from '../../services/artwork.service';

@Component({
  selector: 'app-artwork-display',
  templateUrl: './artwork-display.component.html',
  styleUrls: ['./artwork-display.component.scss']
})
export class ArtworkDisplayComponent implements OnInit {
  artwork$: Observable<Artwork>;

  constructor(private route: ActivatedRoute, private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.artwork$ = this.route.paramMap.pipe(
      switchMap(params => this.artworkService.queryArtwork(params.get('id')))
    );
  }

}
