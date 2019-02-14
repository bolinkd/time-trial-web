import { Component, OnInit } from '@angular/core';
import {TimeTrial, TimeTrialWithData} from '../models/time-trial.model';
import {select, Store} from '@ngrx/store';
import {GetTimeTrials} from '../actions/time-trial.actions';
import {Observable} from 'rxjs';
import {selectAllTimeTrials} from '../reducers/time-trial.reducer';
import {map} from 'rxjs/operators';
import {Boat} from '../models/boat.model';
import {selectAllBoats} from '../reducers/boat.reducer';

@Component({
  selector: 'app-time-trial-list',
  templateUrl: './time-trial-list.component.html',
  styleUrls: ['./time-trial-list.component.scss']
})
export class TimeTrialListComponent implements OnInit {

  time_trials$: Observable<TimeTrial[]>;
  boats$: Observable<Boat[]>;

  constructor(private _store: Store<any>) { }

  ngOnInit() {
    this.time_trials$ = this._store.pipe(select(selectAllTimeTrials));
    this.boats$ = this._store.pipe(select(selectAllBoats));
    this._store.dispatch(new GetTimeTrials());
  }

  getBoatsForTimeTrial(time_trial: TimeTrial): Observable<Boat[]> {
    return this.boats$.pipe(map(boats => boats.filter(x => x.time_trial_id === time_trial.id)));
  }

}
