import { Component, OnInit } from '@angular/core';
import {TimeTrial} from '../models/time-trial.model';
import * as moment from 'moment';
import {select, Store} from '@ngrx/store';
import {LoadTimeTrials} from '../actions/time-trial.actions';
import {Observable} from 'rxjs';
import {selectAllTimeTrials} from '../reducers/time-trial.reducer';

@Component({
  selector: 'app-time-trial-list',
  templateUrl: './time-trial-list.component.html',
  styleUrls: ['./time-trial-list.component.scss']
})
export class TimeTrialListComponent implements OnInit {

  time_trials$: Observable<TimeTrial[]>;
  private initial_time_trials = [
    new TimeTrial(moment().startOf('day'), 2.5),
    new TimeTrial(moment().subtract(1, 'day').startOf('day'), 2.5),
    new TimeTrial(moment().subtract(2, 'day').startOf('day'), 2.5),
    new TimeTrial(moment().subtract(3, 'day').startOf('day'), 2.5),
  ];

  constructor(private _store: Store<any>) { }

  ngOnInit() {
    this._store.dispatch(new LoadTimeTrials( { timeTrials: this.initial_time_trials }));
    this.time_trials$ = this._store.pipe(select(selectAllTimeTrials));
  }

}
