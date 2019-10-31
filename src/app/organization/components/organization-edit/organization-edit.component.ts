import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Organization} from '../../state/models/organization.model';
import {selectCurrentOrganization} from '../../state/reducers/organization.reducer';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, take} from 'rxjs/operators';
import {GetCurrentOrganization} from '../../state/actions/organization.actions';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
})
export class OrganizationEditComponent implements OnInit {

  orgForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    abbreviation: new FormControl(null, Validators.required)
  });

  current_org$: Observable<Organization>;
  constructor(private _store: Store<any>) { }

  ngOnInit() {
    this._store.dispatch(new GetCurrentOrganization());
    this.current_org$ = this._store.pipe(select(selectCurrentOrganization));
    this.current_org$
      .pipe(filter(x => x != null), take(1))
      .subscribe((org) => this.resetForm(org));
  }

  resetForm(org: Organization) {
    this.orgForm.reset({
      id: org.id,
      name: org.name,
      abbreviation: org.abbreviation,
    });
  }
}
