import {ChangeDetectionStrategy, Component, EventEmitter, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Store} from '@ngrx/store';
import {GetCurrentOrganization, GetOrganizations} from '../../organization/state/actions/organization.actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {

  auth_error_text = 'Authentication Failed';
  auth_failed: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  authGroup = new FormGroup({
    organization_id: new FormControl(null, Validators.required),
    token: new FormControl(null, Validators.required)
  });

  constructor(private authService: AuthService, private _store: Store<any>, private router: Router) { }

  ngOnInit() {
    this._store.dispatch(new GetOrganizations());
  }

  login() {
    this.auth_failed.emit(false);
    const formVal = this.authGroup.value;
    this.authService.authenticate(formVal.organization_id, formVal.token)
      .subscribe(valid => {
        if (valid) {
          this._store.dispatch(new GetCurrentOrganization());
          this.router.navigate(['']);
        } else {
          this.auth_failed.emit(true);
        }
      });
  }
}
