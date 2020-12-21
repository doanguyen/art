import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Artwork, ArtworkResponse} from '../models';
import {Params, Router, UrlSerializer} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  constructor(private http: HttpClient, private router: Router, private serializer: UrlSerializer) {
  }

  queryArtworks(params: Params): Observable<ArtworkResponse> {
    const tree = this.router.createUrlTree(['/api', 'artworks'], {queryParams: params});
    return this.http.get<ArtworkResponse>(this.serializer.serialize(tree));
  }

  queryArtwork(id: string): Observable<Artwork> {
    return this.http.get<Artwork>(`/api/artworks/${id}`);
  }

  deleteArtwork(artwork: Artwork): Observable<any> {
    return this.http.delete(`/api/artworks/${artwork.id}`);
  }

  createArtwork(artwork: Partial<Artwork>): Observable<Artwork> {
    return this.http.post<Artwork>('/api/artworks', artwork);
  }

  updateArtwork(id: number, artwork: Partial<Artwork>): Observable<Artwork> {
    return this.http.patch<Artwork>(`/api/artworks/${id}`, artwork);
  }
}
