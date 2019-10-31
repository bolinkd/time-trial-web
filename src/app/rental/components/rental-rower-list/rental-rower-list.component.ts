import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {RentalRower} from '../../state/models/rental-rower.model';
import {selectRentalRowersForRental} from '../../state/reducers/rental-rower.reducer';
import {Rower} from '../../../rower/state/models/rower.model';
import {GetRowersForCurrentOrganization} from '../../../rower/state/actions/rower.actions';
import {selectRowerEntities} from '../../../rower/state/reducers/rower.reducer';
import {Dictionary} from '@ngrx/entity';
import {Shell} from '../../../shell/state/models/shell.model';
import {filter} from 'rxjs/operators';
import {DeleteRentalRower} from '../../state/actions/rental-rower.actions';

@Component({
  selector: 'app-rental-rower-list',
  templateUrl: './rental-rower-list.component.html',
  styleUrls: ['./rental-rower-list.component.scss']
})
export class RentalRowerListComponent implements OnInit {

  rental_rowers$: Observable<RentalRower[]>;
  rowers$: Observable<Dictionary<Rower>>;

  constructor(private _store: Store<any>) {}

  ngOnInit() {
    this._store.dispatch(new GetRowersForCurrentOrganization());
    this.rental_rowers$ = this._store.pipe(select(selectRentalRowersForRental));
    this.rowers$ = this._store.pipe(select(selectRowerEntities));
  }

  deleteRentalRower(rental_rower: RentalRower) {
    this._store.dispatch(new DeleteRentalRower({ id: rental_rower.id }));
  }

}
