import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Organization} from '../state/models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  constructor(private http: HttpClient) { }

  getCurrentOrganization(): Observable<Organization> {
    return this.http.get<string>(`${environment.api_root}/organization`)
      .pipe(
        map(resp => new Organization(resp)),
        catchError(resp => throwError(resp))
      );
  }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<string[]>(`${environment.api_root}/organizations`)
      .pipe(
        map(resp => resp.map(org => new Organization(org))),
        catchError(resp => throwError(resp))
      );
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this.http.post<string>(`${environment.api_root}/organizations`, organization)
      .pipe(
        map(resp => new Organization(resp)),
        catchError(resp => throwError(resp))
      );
  }

  updateOrganization(organization: Organization): Observable<Organization> {
    return this.http.put<string>(`${environment.api_root}/organizations`, organization)
      .pipe(
        map(resp => new Organization(resp)),
        catchError(resp => throwError(resp))
      );
  }
}
