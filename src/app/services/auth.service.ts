import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  orgKey = 'organization';
  tokenKey = 'token';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  getOrganization() {
    return localStorage.getItem(this.orgKey);
  }

  private setAuth(organization_id: number, token: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.orgKey, organization_id.toString());
  }

  isAuthenticated(): boolean {
    const organization_valid = this.getOrganization() != null;
    const token_valid = this.getToken() != null;
    return organization_valid && token_valid;
  }

  authenticate(organization_id: number, token: string): Observable<boolean> {
    return this.http.post('http://localhost:8080/v1/authenticate', {
      organization_id,
      phrase: token
    }).pipe(
      map((resp: string) => {
        this.setAuth(organization_id, resp);
        return true;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.orgKey);
    localStorage.removeItem(this.tokenKey);
  }
}
