import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Boat} from '../../state/models/boat.model';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {selectCurrentTimeTrialBoats} from '../../state/reducers/boat.reducer';
import {GetTimeTrialById, SetSelectedTimeTrial} from '../../state/actions/time-trial.actions';
import {TimeTrial} from '../../state/models/time-trial.model';
import {selectSelectedTimeTrial} from '../../state/reducers/time-trial.reducer';

@Component({
  selector: 'app-time-trial-boats',
  templateUrl: './time-trial-boats.component.html',
  styleUrls: ['./time-trial-boats.component.scss']
})
export class TimeTrialBoatsComponent implements OnInit {

  boats$: Observable<Boat[]>;
  time_trial$: Observable<TimeTrial>;

  constructor(private _store: Store<any>, private route: ActivatedRoute) { }

  ngOnInit() {
    this._store.dispatch(new GetTimeTrialById({ id: +this.route.snapshot.params.id }));
    this._store.dispatch(new SetSelectedTimeTrial({ id: +this.route.snapshot.params.id }));
    this.boats$ = this._store.pipe(select(selectCurrentTimeTrialBoats));
    this.time_trial$ = this._store.pipe(select(selectSelectedTimeTrial));
  }

  goBack() {
    window.history.back();
  }

}
