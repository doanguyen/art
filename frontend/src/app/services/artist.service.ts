import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArtistResponse} from '../models';
import {Params, Router, UrlSerializer} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor(private http: HttpClient, private router: Router, private serializer: UrlSerializer) {
  }

  get listNationality$(): Observable<string[]> {
    return this.http.get<string[]>('/api/artists/nationality');
  }

  queryArtist(queryParams: Params): Observable<ArtistResponse> {
    const tree = this.router.createUrlTree(['/api', 'artists'], {queryParams});
    return this.http.get<ArtistResponse>(this.serializer.serialize(tree));
  }
}
