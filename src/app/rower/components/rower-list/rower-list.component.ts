import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectCurrentOrganizationRowers} from '../../state/reducers/rower.reducer';
import {Rower} from '../../state/models/rower.model';
import {GetRowersForCurrentOrganization} from '../../state/actions/rower.actions';

@Component({
  selector: 'app-rower-list',
  templateUrl: './rower-list.component.html',
  styleUrls: ['./rower-list.component.scss']
})
export class RowerListComponent implements OnInit {

  rowers$: Observable<Rower[]>;
  constructor(private _store: Store<any>) { }

  ngOnInit() {
    this._store.dispatch(new GetRowersForCurrentOrganization());
    this.rowers$ = this._store.pipe(select(selectCurrentOrganizationRowers));
  }

}
