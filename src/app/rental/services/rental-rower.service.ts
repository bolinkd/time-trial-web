import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {RentalRower} from '../state/models/rental-rower.model';

@Injectable({
  providedIn: 'root'
})
export class RentalRowerService {
  constructor(private http: HttpClient) { }

  createRental(rentalRower: RentalRower): Observable<RentalRower> {
    return this.http.post<string>(`${environment.api_root}/rental-rowers`, rentalRower)
      .pipe(
        map(resp => new RentalRower(resp)),
        catchError(resp => throwError(resp))
      );
  }

  deleteRentalRower(id: number): Observable<number> {
    return this.http.delete<string>(`${environment.api_root}/rental-rowers/${id}`)
      .pipe(
        map(() => id),
        catchError(resp => throwError(resp))
      );
  }
}
