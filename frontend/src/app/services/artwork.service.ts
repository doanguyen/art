import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Artwork, ArtworksResponse} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private readonly artworks = new BehaviorSubject<Artwork[]>([]);
  artworks$ = this.artworks.asObservable();

  constructor(private http: HttpClient) {
  }

  fetch_artworks(): void {
    this.http.get<ArtworksResponse>('/api/artworks').subscribe(r => this.artworks.next(r.results));
  }
}
