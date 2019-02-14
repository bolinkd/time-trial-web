import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {take} from 'rxjs/operators';
import {untilDestroy} from '@ngrx-utils/store';
import {BoatActions, BoatActionTypes, CreateBoat} from '../actions/boat.actions';
import {Boat} from '../models/boat.model';

@Component({
  selector: 'app-time-trial-boats-create',
  templateUrl: './time-trial-boats-create.component.html',
  styleUrls: ['./time-trial-boats-create.component.scss']
})
export class TimeTrialBoatsCreateComponent implements OnInit, OnDestroy {

  constructor(private _store: Store<any>, private _actions$: Actions) { }

  ngOnInit() { }

  ngOnDestroy(): void { }

  createBoat(boat: Boat) {
    this._store.dispatch(new CreateBoat({ boat }));
    this._actions$
      .pipe(
        ofType<BoatActions>(BoatActionTypes.CreateBoatSuccess, BoatActionTypes.CreateBoatFailure),
        take(1),
        untilDestroy(this)
      )
      .subscribe(action => {
        switch (action.type) {
          case BoatActionTypes.CreateBoatSuccess: {
            window.history.back();
            return;
          }
          case BoatActionTypes.CreateBoatFailure: {
            return;
          }
        }
      });
  }

  cancelUpdate() {
    window.history.back();
  }
}
