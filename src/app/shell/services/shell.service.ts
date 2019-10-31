import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TimeTrial, TimeTrialWithData} from '../../time-trial/state/models/time-trial.model';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Shell} from '../state/models/shell.model';

@Injectable({
  providedIn: 'root'
})
export class ShellService {
  constructor(private http: HttpClient) { }

  getShellsForCurrentOrganization(): Observable<Shell[]> {
    return this.http.get<string[]>(`${environment.api_root}/shells`)
      .pipe(
        map(resp => resp.map(x => new Shell(x))),
        catchError(resp => throwError(resp))
      );
  }

  createShell(shell: Shell): Observable<Shell> {
    return this.http.post<string>(`${environment.api_root}/shells`, shell)
      .pipe(
        map(resp => new Shell(resp)),
        catchError(resp => throwError(resp))
      );
  }

  updateShell(shell: Shell): Observable<Shell> {
    return this.http.put<string>(`${environment.api_root}/shells`, shell)
      .pipe(
        map(resp => new Shell(resp)),
        catchError(resp => throwError(resp))
      );
  }
}
