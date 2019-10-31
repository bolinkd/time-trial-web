import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import * as moment from 'moment';
import {Rental, RentalWithData} from '../state/models/rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  constructor(private http: HttpClient) { }

  getRentalsForCurrentOrganization(): Observable<RentalWithData[]> {
    let params = new HttpParams();
    params = params.append('start_time', moment().startOf('day').utc().format());
    params = params.append('end_time', moment().endOf('day').utc().format());
    return this.http.get<string[]>(`${environment.api_root}/rentals`, { params })
      .pipe(
        map(resp => resp.map(x => new RentalWithData(x))),
        catchError(resp => {
          console.log(resp);
          return throwError(resp);
        })
      );
  }

  createRental(rental: Rental): Observable<Rental> {
    return this.http.post<string>(`${environment.api_root}/rentals`, rental)
      .pipe(
        map(resp => new Rental(resp)),
        catchError(resp => throwError(resp))
      );
  }

  updateRental(rental: Rental): Observable<Rental> {
    return this.http.put<string>(`${environment.api_root}/rentals`, rental)
      .pipe(
        map(resp => new Rental(resp)),
        catchError(resp => throwError(resp))
      );
  }
}
