import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TimerCount, TimeTrial} from '../models/time-trial.model';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SetSelectedTimeTrial} from '../actions/time-trial.actions';
import {select, Store} from '@ngrx/store';
import {selectSelectedTimeTrial} from '../reducers/time-trial.reducer';
import {take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {Update} from '@ngrx/entity';

@Component({
  selector: 'app-time-trial-form',
  templateUrl: './time-trial-form.component.html',
  styleUrls: ['./time-trial-form.component.scss']
})
export class TimeTrialFormComponent implements OnInit {
  @Output('cancel') cancel = new EventEmitter<any>();
  @Output('complete') complete = new EventEmitter<Update<TimeTrial>>();

  TimerCount = TimerCount;

  time_trial$: Observable<TimeTrial>;

  timeTrialGroup: FormGroup;
  timeTrialDateControl: FormControl;
  timeTrialDistanceControl: FormControl;
  timeTrialTimersControl: FormControl;

  constructor(private _store: Store<any>, private route: ActivatedRoute) {}

  ngOnInit() {
    this._store.dispatch(new SetSelectedTimeTrial({ id: +this.route.snapshot.params.id }));
    this.time_trial$ = this._store.pipe(select(selectSelectedTimeTrial));
    this.setupFormGroup();
    this.time_trial$
      .pipe(take(1))
      .subscribe(time_trial => {
        this.updateTimeTrialForm(time_trial);
      });
  }

  updateTimeTrialForm(time_trial: TimeTrial) {
    if (time_trial == null) {
      this.timeTrialDateControl.setValue(moment().startOf('day'));
      this.timeTrialDistanceControl.setValue(2);
      this.timeTrialTimersControl.setValue(TimerCount.one);
    } else {
      this.timeTrialDateControl.setValue(time_trial.date);
      this.timeTrialDistanceControl.setValue(time_trial.distance);
      this.timeTrialTimersControl.setValue(time_trial.timers);
    }

  }

  setupFormGroup() {
    this.timeTrialDateControl = new FormControl(null, Validators.required);
    this.timeTrialDistanceControl = new FormControl(null, Validators.required);
    this.timeTrialTimersControl = new FormControl(null, Validators.required);
    this.timeTrialGroup = new FormGroup({
      date: this.timeTrialDateControl,
      distance: this.timeTrialDistanceControl,
      timers: this.timeTrialTimersControl,
    });
  }

  completeForm() {
    const update: Update<TimeTrial> = this.timeTrialGroup.getRawValue() as Update<TimeTrial>;
    this.complete.emit(update);
  }
}
