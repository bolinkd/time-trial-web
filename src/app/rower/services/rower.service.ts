import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Rower} from '../state/models/rower.model';

@Injectable({
  providedIn: 'root'
})
export class RowerService {
  constructor(private http: HttpClient) { }

  getRowersForCurrentOrganization(): Observable<Rower[]> {
    return this.http.get<string[]>(`${environment.api_root}/rowers`)
      .pipe(
        map(resp => resp.map(x => new Rower(x))),
        catchError(resp => throwError(resp))
      );
  }

  createRower(rower: Rower): Observable<Rower> {
    return this.http.post<string>(`${environment.api_root}/rowers`, rower)
      .pipe(
        map(resp => new Rower(resp)),
        catchError(resp => throwError(resp))
      );
  }

  updateRower(rower: Rower): Observable<Rower> {
    return this.http.put<string>(`${environment.api_root}/rowers`, rower)
      .pipe(
        map(resp => new Rower(resp)),
        catchError(resp => throwError(resp))
      );
  }
}
