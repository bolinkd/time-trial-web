import { Component, OnInit } from '@angular/core';
import {TimeTrial} from '../../state/models/time-trial.model';
import {select, Store} from '@ngrx/store';
import {GetTimeTrials} from '../../state/actions/time-trial.actions';
import {Observable} from 'rxjs';
import {selectAllTimeTrials} from '../../state/reducers/time-trial.reducer';
import {map} from 'rxjs/operators';
import {Boat} from '../../state/models/boat.model';
import {selectAllBoats} from '../../state/reducers/boat.reducer';
import {SocketService} from '../../../socket/socket.service';

@Component({
  selector: 'app-time-trial-list',
  templateUrl: './time-trial-list.component.html',
  styleUrls: ['./time-trial-list.component.scss']
})
export class TimeTrialListComponent implements OnInit {

  time_trials$: Observable<TimeTrial[]>;
  boats$: Observable<Boat[]>;

  constructor(private _store: Store<any>, private socket: SocketService) { }

  ngOnInit() {
    this.time_trials$ = this._store.pipe(select(selectAllTimeTrials));
    this.boats$ = this._store.pipe(select(selectAllBoats));
    this._store.dispatch(new GetTimeTrials());
  }

  getBoatsForTimeTrial(time_trial: TimeTrial): Observable<Boat[]> {
    return this.boats$.pipe(map(boats => boats.filter(x => x.time_trial_id === time_trial.id)));
  }

  test(time_trial: TimeTrial) {
    this.socket.joinRace(time_trial);
  }

}
