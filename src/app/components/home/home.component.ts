import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {GetCurrentOrganization} from '../../organization/state/actions/organization.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _store: Store<any>) { }

  ngOnInit() {
    this._store.dispatch(new GetCurrentOrganization());
  }

}
