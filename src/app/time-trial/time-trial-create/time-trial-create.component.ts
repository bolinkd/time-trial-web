import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimeTrial} from '../models/time-trial.model';
import {Store} from '@ngrx/store';
import {CreateTimeTrial, CreateTimeTrialFailure, TimeTrialActions, TimeTrialActionTypes} from '../actions/time-trial.actions';
import {Actions, ofType} from '@ngrx/effects';
import {take} from 'rxjs/operators';
import {untilDestroy} from '@ngrx-utils/store';

@Component({
  selector: 'app-time-trial-create',
  templateUrl: './time-trial-create.component.html',
  styleUrls: ['./time-trial-create.component.scss']
})
export class TimeTrialCreateComponent implements OnInit, OnDestroy {

  constructor(private _store: Store<any>, private _actions$: Actions) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  createTimeTrial(time_trial: TimeTrial) {
    this._store.dispatch(new CreateTimeTrial({ time_trial }));
    this._actions$
      .pipe(
        ofType<TimeTrialActions>(TimeTrialActionTypes.CreateTimeTrialSuccess, TimeTrialActionTypes.CreateTimeTrialFailure),
        take(1),
        untilDestroy(this)
      )
      .subscribe(action => {
        switch (action.type) {
          case TimeTrialActionTypes.CreateTimeTrialSuccess: {
            window.history.back();
            return;
          }
          case TimeTrialActionTypes.CreateTimeTrialFailure: {
            return;
          }
        }
      });
  }

  cancelUpdate() {
    window.history.back();
  }


}
