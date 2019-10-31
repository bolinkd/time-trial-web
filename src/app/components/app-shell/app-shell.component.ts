import {Component, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Organization} from '../../organization/state/models/organization.model';
import {selectCurrentOrganization} from '../../organization/state/reducers/organization.reducer';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MatDrawer} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {GetCurrentOrganization, SetCurrentOrganization} from '../../organization/state/actions/organization.actions';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;

  current_org$: Observable<Organization>;
  constructor(private _store: Store<any>, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this._store.dispatch(new SetCurrentOrganization({ id: this.authService.getOrganization() }));
      this._store.dispatch(new GetCurrentOrganization());
    }

    this.current_org$ = this._store.pipe(select(selectCurrentOrganization));
    this.router.events
      .pipe(filter(x => (x instanceof NavigationEnd)))
      .subscribe(x => this.drawer.close());
  }

  getHeaderText(org: Organization) {
    return org ? org.name : 'Boathouse Management System';
  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
