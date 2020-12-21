import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Artwork, ArtworksResponse} from '../models';
import {filter} from 'rxjs/operators';
import {Params, Router, UrlSerializer} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private readonly artworksResponse = new BehaviorSubject<ArtworksResponse>(null);
  artworksResponse$ = this.artworksResponse.asObservable().pipe(filter(a => !!a));

  constructor(private http: HttpClient, private router: Router, private serializer: UrlSerializer) {
  }

  fetch_artworks(): void {
    this.http.get<ArtworksResponse>('/api/artworks').subscribe(r => {
      this.artworksResponse.next(r);
    });
  }

  queryArtworks(params: Params): Observable<ArtworksResponse> {
    const tree = this.router.createUrlTree(['/api', 'artworks'], {queryParams: params});
    return this.http.get<ArtworksResponse>(this.serializer.serialize(tree));
  }

  queryArtwork(id: string): Observable<Artwork> {
    return this.http.get<Artwork>(`/api/artworks/${id}`);
  }
}
