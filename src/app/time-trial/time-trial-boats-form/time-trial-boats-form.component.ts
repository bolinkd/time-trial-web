import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Boat} from '../models/boat.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GetTimeTrialById, SetSelectedTimeTrial} from '../actions/time-trial.actions';
import {select, Store} from '@ngrx/store';
import {untilDestroy} from '@ngrx-utils/store';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {selectCurrentTimeTrialBoats, selectSelectedBoat} from '../reducers/boat.reducer';
import {SetSelectedBoat} from '../actions/boat.actions';
import {TimeTrial} from '../models/time-trial.model';
import {selectSelectedTimeTrial} from '../reducers/time-trial.reducer';

@Component({
  selector: 'app-time-trial-boats-form',
  templateUrl: './time-trial-boats-form.component.html',
  styleUrls: ['./time-trial-boats-form.component.scss']
})
export class TimeTrialBoatsFormComponent implements OnInit, OnDestroy {
  @Output() cancel = new EventEmitter<any>();
  @Output() complete = new EventEmitter<Boat>();

  boat$: Observable<Boat>;
  boats$: Observable<Boat[]>;
  time_trial$: Observable<TimeTrial>;

  boatGroup: FormGroup;
  boatIdControl: FormControl;
  boatBowMarkerControl: FormControl;
  boatNameControl: FormControl;

  boatTimeTrialIdControl: FormControl;
  boatStartControl: FormControl;
  boatEndControl: FormControl;
  boatTimeControl: FormControl;

  constructor(private _store: Store<any>, private route: ActivatedRoute) { }

  ngOnInit() {
    this._store.dispatch(new SetSelectedTimeTrial({ id: +this.route.snapshot.params.id }));
    this._store.dispatch(new GetTimeTrialById({ id: +this.route.snapshot.params.id }));
    this._store.dispatch(new SetSelectedBoat({ id: +this.route.snapshot.params.boat_id }));
    this.boat$ = this._store.pipe(select(selectSelectedBoat));
    this.boats$ = this._store.pipe(select(selectCurrentTimeTrialBoats));
    this.time_trial$ = this._store.pipe(select(selectSelectedTimeTrial));
    this.setupFormGroup();
    combineLatest(this.boat$, this.time_trial$, this.boats$)
      .pipe(untilDestroy(this))
      .subscribe(([boat, time_trial, all_boats]) => {
        this.updateBoatForm(boat, time_trial, all_boats);
      });
  }

  ngOnDestroy(): void { }

  setupFormGroup() {
    this.boatIdControl = new FormControl(null);
    this.boatTimeTrialIdControl = new FormControl(null);
    this.boatBowMarkerControl = new FormControl(null, Validators.required);
    this.boatNameControl = new FormControl(null, Validators.required);
    this.boatStartControl = new FormControl(null);
    this.boatEndControl = new FormControl(null);
    this.boatTimeControl = new FormControl(null);

    this.boatGroup = new FormGroup({
      id: this.boatIdControl,
      time_trial_id: this.boatTimeTrialIdControl,
      bow_marker: this.boatBowMarkerControl,
      name: this.boatNameControl,
      start: this.boatStartControl,
      end: this.boatEndControl,
      time: this.boatTimeControl
    });
  }

  updateBoatForm(boat: Boat, time_trial: TimeTrial, all_boats: Boat[]) {
    if (time_trial != null) {
      this.boatTimeTrialIdControl.setValue(time_trial.id);
    }
    if (boat == null) {
      this.boatIdControl.setValue(null);
      this.boatBowMarkerControl.setValue(null);
      this.boatNameControl.setValue(null);
      const max_bow_marker = all_boats
        .map(x => x.bow_marker)
        .reduce((prev, curr) => prev > curr ? prev : curr, 0);
      this.boatBowMarkerControl.setValue(max_bow_marker + 1);
    } else {
      this.boatIdControl.setValue(boat.id);
      this.boatBowMarkerControl.setValue(boat.bow_marker);
      this.boatNameControl.setValue(boat.name);
      this.boatStartControl.setValue(boat.start);
      this.boatEndControl.setValue(boat.end);
      this.boatTimeControl.setValue(boat.time);
    }
  }

  completeForm() {
    const boat: Boat = this.boatGroup.getRawValue() as Boat;
    this.complete.emit(boat);
  }

}
