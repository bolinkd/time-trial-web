import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {GetRentalsForCurrentOrganization, SetSelectedRental} from '../../state/actions/rental.actions';
import {ActivatedRoute} from '@angular/router';
import {selectSelectedRental} from '../../state/reducers/rental.reducer';
import {Observable} from 'rxjs';
import {Rental} from '../../state/models/rental.model';
import {Shell} from '../../../shell/state/models/shell.model';
import {selectAllShells} from '../../../shell/state/reducers/shell.reducer';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, take} from 'rxjs/operators';
import {GetShellsForCurrentOrganization} from '../../../shell/state/actions/shell.actions';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material';
import {RowerSelectComponent} from '../../../rower/components/rower-select/rower-select.component';
import {CreateRentalRower} from '../../state/actions/rental-rower.actions';

@Component({
  selector: 'app-rental-edit',
  templateUrl: './rental-edit.component.html',
  styleUrls: ['./rental-edit.component.scss']
})
export class RentalEditComponent implements OnInit {

  rentalForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    shell_id: new FormControl(null, Validators.required),
    out_time: new FormControl({ value: null, disabled: true }, Validators.required),
    in_time: new FormControl(),
  });

  selected_rental$: Observable<Rental>;
  shells$: Observable<Shell[]>;
  constructor(private _store: Store<any>, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this._store.dispatch(new GetRentalsForCurrentOrganization());
    this._store.dispatch(new GetShellsForCurrentOrganization());
    this._store.dispatch(new SetSelectedRental({ id }));
    this.selected_rental$ = this._store.pipe(select(selectSelectedRental));
    this.shells$ = this._store.pipe(select(selectAllShells));
    this.selected_rental$
      .pipe(filter(x => x != null), take(1))
      .subscribe(rental => this.resetForm(rental));
  }

  resetForm(rental: Rental) {
    this.rentalForm.reset({
      id: rental.id,
      shell_id: rental.shell_id,
      out_time: rental.out_time,
      in_time: rental.in_time
    });
  }

  addRentalRower() {
    const ref = this.dialog.open(RowerSelectComponent);
    ref.afterClosed().subscribe(rower_id => {
      this._store.dispatch(new CreateRentalRower({
        rental_rower: {
          id: null,
          rental_id: this.rentalForm.get('id').value,
          rower_id
        }
      }));
    });
  }

}
