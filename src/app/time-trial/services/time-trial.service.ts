import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimeTrial, TimeTrialWithData} from '../models/time-trial.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeTrialService {

  constructor(private http: HttpClient) { }

  getTimeTrials(): Observable<TimeTrialWithData[]> {
    return this.http.get<string[]>(`${environment.api_root}/time-trials`)
      .pipe(
        map(resp => resp.map(time_trial => new TimeTrialWithData(time_trial))),
        catchError(resp => throwError(resp))
      );
  }

  getTimeTrialById(id: number): Observable<TimeTrialWithData> {
    return this.http.get<string>(`${environment.api_root}/time-trials/${id}`)
      .pipe(
        map(resp => new TimeTrialWithData(resp)),
        catchError(resp => throwError(resp))
      );
  }

  createTimeTrial(time_trial: TimeTrial): Observable<TimeTrial> {
    return this.http.post<string>(`${environment.api_root}/time-trials`, time_trial)
      .pipe(
        map(resp => new TimeTrial(resp)),
        catchError(resp => throwError(resp))
      );
  }

  updateTimeTrial(time_trial: TimeTrial): Observable<TimeTrial> {
    return this.http.put<string>(`${environment.api_root}/time-trials`, time_trial)
      .pipe(
        map(resp => new TimeTrial(resp)),
        catchError(resp => throwError(resp))
      );
  }
}
