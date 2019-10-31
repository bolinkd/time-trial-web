import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Rental} from '../../state/models/rental.model';
import {Shell} from '../../../shell/state/models/shell.model';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateRental, CreateRentalSuccess, RentalActionTypes, SetSelectedRental} from '../../state/actions/rental.actions';
import {GetShellsForCurrentOrganization} from '../../../shell/state/actions/shell.actions';
import {selectAllShells} from '../../../shell/state/reducers/shell.reducer';
import * as moment from 'moment';
import {Actions, ofType} from '@ngrx/effects';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  rentalForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    shell_id: new FormControl(null, Validators.required),
    out_time: new FormControl({ value: moment(), disabled: true }, Validators.required),
    in_time: new FormControl(),
  });

  shells$: Observable<Shell[]>;
  constructor(private _store: Store<any>, private router: Router, private route: ActivatedRoute, private actions$: Actions) { }

  ngOnInit() {
    this._store.dispatch(new GetShellsForCurrentOrganization());
    this._store.dispatch(new SetSelectedRental({ id: null }));
    this.shells$ = this._store.pipe(select(selectAllShells));
  }

  createRental() {
    const rental = this.rentalForm.getRawValue() as Rental;
    this._store.dispatch(new CreateRental({ rental }));
    this.actions$
      .pipe(ofType(RentalActionTypes.CreateRentalSuccess, RentalActionTypes.CreateRentalFailure), take(1))
      .subscribe((action: any) => {
        if (action instanceof CreateRentalSuccess) {
          const id = (action as CreateRentalSuccess).payload.rental.id;
          this.router.navigate(['../', id], { relativeTo: this.route });
        } else {
          // TODO: ERROR
        }
      });
  }

  cancelCreate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
