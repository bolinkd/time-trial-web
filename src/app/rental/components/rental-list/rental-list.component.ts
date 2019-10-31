import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {GetRentalsForCurrentOrganization, UpdateRental} from '../../state/actions/rental.actions';
import {Rental} from '../../state/models/rental.model';
import {selectAllRentals} from '../../state/reducers/rental.reducer';
import {Shell} from '../../../shell/state/models/shell.model';
import {selectShellEntities} from '../../../shell/state/reducers/shell.reducer';
import {Dictionary} from '@ngrx/entity';
import {GetShellsForCurrentOrganization} from '../../../shell/state/actions/shell.actions';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  rentals$: Observable<Rental[]>;
  shells$: Observable<Dictionary<Shell>>;

  constructor(private _store: Store<any>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this._store.dispatch(new GetRentalsForCurrentOrganization());
    this._store.dispatch(new GetShellsForCurrentOrganization());
    this.rentals$ = this._store.pipe(select(selectAllRentals));
    this.shells$ = this._store.pipe(select(selectShellEntities));
  }

  goToRental(rental: Rental) {
    this.router.navigate([rental.id], { relativeTo: this.route });
  }

  createRental() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  markRentalAsReturned(rental: Rental) {
    rental.in_time = moment();
    this._store.dispatch(new UpdateRental({ rental }));
  }

}
