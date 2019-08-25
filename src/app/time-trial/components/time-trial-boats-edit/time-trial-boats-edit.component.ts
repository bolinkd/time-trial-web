import {Component, OnDestroy, OnInit} from '@angular/core';
import {Boat} from '../../state/models/boat.model';
import {BoatActions, BoatActionTypes, CreateBoat, UpdateBoat} from '../../state/actions/boat.actions';
import {Actions, ofType} from '@ngrx/effects';
import {take} from 'rxjs/operators';
import {untilDestroy} from '@ngrx-utils/store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-time-trial-boats-edit',
  templateUrl: './time-trial-boats-edit.component.html',
  styleUrls: ['./time-trial-boats-edit.component.scss']
})
export class TimeTrialBoatsEditComponent implements OnInit, OnDestroy {

  constructor(private _store: Store<any>, private _actions$: Actions) { }

  ngOnInit() { }

  ngOnDestroy(): void { }

  updateBoat(boat: Boat) {
    this._store.dispatch(new UpdateBoat({ boat }));
    this._actions$
      .pipe(
        ofType<BoatActions>(BoatActionTypes.UpdateBoatSuccess, BoatActionTypes.UpdateBoatFailure),
        take(1),
        untilDestroy(this)
      )
      .subscribe(action => {
        switch (action.type) {
          case BoatActionTypes.UpdateBoatSuccess: {
            window.history.back();
            return;
          }
          case BoatActionTypes.UpdateBoatFailure: {
            return;
          }
        }
      });
  }

  cancelUpdate() {
    window.history.back();
  }
}
