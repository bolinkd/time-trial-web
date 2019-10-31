import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();
      const organization = this.authService.getOrganization();
      req = req.clone({
        headers: req.headers.append('Authorization', token).append('Organization', `${organization}`)
      });
    }

    return next.handle(req);
  }
}
