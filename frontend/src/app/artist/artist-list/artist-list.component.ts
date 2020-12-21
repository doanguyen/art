import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../services/artist.service';
import {Observable} from 'rxjs';
import {Artist, ArtistResponse} from '../../models';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  artistResponse$: Observable<ArtistResponse>;
  page: number;

  constructor(private artistService: ArtistService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.artistResponse$ = this.route.queryParams.pipe(
      tap(params => {
        const {page} = params;
        this.page = page - 1;
      }),
      switchMap(params => this.artistService.queryArtist(params))
    );
  }

  gotoArtworkByArtist(artist: Artist): void {
    this.router.navigate(['artworks'], {queryParams: {artist: artist.DisplayName}});
  }

  gotoPage($event: PageEvent): void {
    const queryParams = {page: $event.pageIndex + 1};
    this.router.navigate([], {relativeTo: this.route, queryParams, queryParamsHandling: 'merge'});

  }
}
