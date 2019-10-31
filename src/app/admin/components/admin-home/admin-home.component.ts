import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {GetGroupsForCurrentOrganization} from '../../../group/state/actions/group.actions';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private _store: Store<any>) { }

  ngOnInit() {
    this._store.dispatch(new GetGroupsForCurrentOrganization());
  }

}
