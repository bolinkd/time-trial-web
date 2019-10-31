import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Group} from '../state/models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private http: HttpClient) { }

  getGroupsForCurrentOrganization(): Observable<Group[]> {
    return this.http.get<any[]>(`${environment.api_root}/groups`)
      .pipe(
        map(resp => resp.map(x => new Group(x))),
        catchError(resp => throwError(resp))
      );
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<any>(`${environment.api_root}/groups`, group)
      .pipe(
        map(resp => new Group(resp)),
        catchError(resp => throwError(resp))
      );
  }

  updateGroup(group: Group): Observable<Group> {
    return this.http.put<any>(`${environment.api_root}/groups`, group)
      .pipe(
        map(resp => new Group(resp)),
        catchError(resp => throwError(resp))
      );
  }
}
