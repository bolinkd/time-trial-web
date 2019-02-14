import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Boat} from '../models/boat.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  constructor(private http: HttpClient) { }

  createBoat(boat: Boat): Observable<Boat> {
    return this.http.post<string>(`${environment.api_root}/boats`, boat)
      .pipe(
        map(resp => new Boat(resp)),
        catchError(resp => throwError(resp))
      );
  }

  updateBoat(boat: Boat): Observable<Boat> {
    return this.http.put<string>(`${environment.api_root}/boats`, boat)
      .pipe(
        map(resp => new Boat(resp)),
        catchError(resp => throwError(resp))
      );
  }
}
