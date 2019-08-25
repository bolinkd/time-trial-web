import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {TimeTrial} from '../../state/models/time-trial.model';
import {CreateTimeTrial, TimeTrialActions, TimeTrialActionTypes, UpdateTimeTrial} from '../../state/actions/time-trial.actions';
import {Actions, ofType} from '@ngrx/effects';
import {take} from 'rxjs/operators';
import {untilDestroy} from '@ngrx-utils/store';

@Component({
  selector: 'app-time-trial-edit',
  templateUrl: './time-trial-edit.component.html',
  styleUrls: ['./time-trial-edit.component.scss']
})
export class TimeTrialEditComponent implements OnInit, OnDestroy {

  constructor(private _store: Store<any>, private _actions$: Actions) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  updateTimeTrial(time_trial: TimeTrial) {
    this._store.dispatch(new UpdateTimeTrial({ time_trial }));
    this._actions$
      .pipe(
        ofType<TimeTrialActions>(TimeTrialActionTypes.UpdateTimeTrialSuccess, TimeTrialActionTypes.UpdateTimeTrialFailure),
        take(1),
        untilDestroy(this)
      )
      .subscribe(action => {
        switch (action.type) {
          case TimeTrialActionTypes.UpdateTimeTrialSuccess: {
            window.history.back();
            return;
          }
          case TimeTrialActionTypes.UpdateTimeTrialFailure: {
            return;
          }
        }
      });
  }

  cancelUpdate() {
    window.history.back();
  }
}
