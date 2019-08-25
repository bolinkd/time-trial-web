import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TimerCount, TimeTrial} from '../../state/models/time-trial.model';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GetTimeTrialById, SetSelectedTimeTrial} from '../../state/actions/time-trial.actions';
import {select, Store} from '@ngrx/store';
import {selectSelectedTimeTrial} from '../../state/reducers/time-trial.reducer';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {untilDestroy} from '@ngrx-utils/store';

@Component({
  selector: 'app-time-trial-form',
  templateUrl: './time-trial-form.component.html',
  styleUrls: ['./time-trial-form.component.scss']
})
export class TimeTrialFormComponent implements OnInit, OnDestroy {
  @Output() cancel = new EventEmitter<any>();
  @Output() complete = new EventEmitter<TimeTrial>();

  TimerCount = TimerCount;

  time_trial$: Observable<TimeTrial>;

  timeTrialGroup: FormGroup;
  timeTrialIdControl: FormControl;
  timeTrialDateControl: FormControl;
  timeTrialDistanceControl: FormControl;
  timeTrialTimersControl: FormControl;

  constructor(private _store: Store<any>, private route: ActivatedRoute) {}

  ngOnInit() {
    const time_trial_id = +this.route.snapshot.params.id;
    this._store.dispatch(new SetSelectedTimeTrial({ id: time_trial_id }));
    if (!isNaN(time_trial_id)) {
      this._store.dispatch(new GetTimeTrialById({ id: time_trial_id }));
    }
    this.time_trial$ = this._store.pipe(select(selectSelectedTimeTrial));
    this.setupFormGroup();
    this.time_trial$
      .pipe(untilDestroy(this))
      .subscribe(time_trial => {
        this.updateTimeTrialForm(time_trial);
      });
  }

  ngOnDestroy(): void { }

  updateTimeTrialForm(time_trial: TimeTrial) {
    if (time_trial == null) {
      this.timeTrialIdControl.setValue(null);
      this.timeTrialDateControl.setValue(moment().startOf('day'));
      this.timeTrialDistanceControl.setValue(2);
      this.timeTrialTimersControl.setValue(TimerCount.one);
    } else {
      this.timeTrialIdControl.setValue(time_trial.id);
      this.timeTrialDateControl.setValue(time_trial.date);
      this.timeTrialDistanceControl.setValue(time_trial.distance);
      this.timeTrialTimersControl.setValue(time_trial.timers);
    }
  }

  setupFormGroup() {
    this.timeTrialIdControl = new FormControl(null);
    this.timeTrialDateControl = new FormControl(null, Validators.required);
    this.timeTrialDistanceControl = new FormControl(null, Validators.required);
    this.timeTrialTimersControl = new FormControl(null, Validators.required);
    this.timeTrialGroup = new FormGroup({
      id: this.timeTrialIdControl,
      date: this.timeTrialDateControl,
      distance: this.timeTrialDistanceControl,
      timers: this.timeTrialTimersControl,
    });
  }

  completeForm() {
    const time_trial: TimeTrial = this.timeTrialGroup.getRawValue() as TimeTrial;
    this.complete.emit(time_trial);
  }
}
