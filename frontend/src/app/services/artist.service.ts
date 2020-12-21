import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) {
  }

  get listNationality$(): Observable<string[]> {
    return this.http.get<string[]>('/api/artists/nationality');
  }
}
