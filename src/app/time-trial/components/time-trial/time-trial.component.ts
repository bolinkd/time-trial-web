import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {Boat} from '../../state/models/boat.model';
import {select, Store} from '@ngrx/store';
import {SetCurrentPage, SetPageSize, UpdateBoat} from '../../state/actions/boat.actions';
import {Observable, Subscription} from 'rxjs';
import {selectBoatPageCount, selectCurrentBoats, selectCurrentPage} from '../../state/reducers/boat.reducer';
import {TimeTrial, TimingStatus} from '../../state/models/time-trial.model';
import {GetTimeTrialById, SetSelectedTimeTrial, UpdateTimeTrial} from '../../state/actions/time-trial.actions';
import {ActivatedRoute} from '@angular/router';
import {selectSelectedTimeTrial, selectSelectedTimeTrialId} from '../../state/reducers/time-trial.reducer';
import {filter, map, take} from 'rxjs/operators';
import {untilDestroy} from '@ngrx-utils/store';
import {selectCurrentTimeTrialSnapshots} from '../../state/reducers/snapshot.reducer';
import {AddSnapshot, DeleteSnapshot, LoadSnapshotsLocalStorage} from '../../state/actions/snapshot.actions';
import {Snapshot} from '../../state/models/snapshot.model';

enum BoatTime {
  'start' = 0,
  'end',
}

@Component({
  selector: 'app-time-trial',
  templateUrl: './time-trial.component.html',
  styleUrls: ['./time-trial.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeTrialComponent implements OnInit, OnDestroy {
  @ViewChildren('lists') lists: QueryList<CdkDropList>;
  @ViewChild('snapshotsContainer', { static: false }) snapshots_container: ElementRef;
  @ViewChild('boatsContainer', { static: false }) boats_container: ElementRef;
  @ViewChild('scrollUpButton', { static: false }) scroll_up_button: ElementRef;
  @ViewChild('scrollDownButton', { static: false }) scroll_down_button: ElementRef;

  BoatTime = BoatTime;
  TimingStatus = TimingStatus;

  timer: any = null;
  curr_time: Moment = null;
  elapsed_time: number = null;

  scroll_down_interval = null;
  scroll_up_interval = null;

  dragged_boat: Boat = null;
  dragged_start: BoatTime = null;
  dragged_snapshot: number = null;

  current_boats$: Observable<Boat[]>;
  boat_page_count$: Observable<number>;
  curr_page$: Observable<number>;
  snapshots$: Observable<Snapshot[]>;
  time_trial$: Observable<TimeTrial>;
  time_trial_id$: Observable<number>;

  ngOnDestroy(): void { }

  constructor(private cdRef: ChangeDetectorRef,
              private _store: Store<any>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const sizeChangeObserver = new MutationObserver(() => this.pageResize());
    sizeChangeObserver.observe(this.boats_container.nativeElement, { attributes: true });

    this._store.dispatch(new GetTimeTrialById({ id: +this.route.snapshot.params.id }));
    this._store.dispatch(new SetSelectedTimeTrial({ id: +this.route.snapshot.params.id }));
    this._store.dispatch(new LoadSnapshotsLocalStorage());
    this.current_boats$ = this._store.pipe(select(selectCurrentBoats));
    this.boat_page_count$ = this._store.pipe(select(selectBoatPageCount));
    this.curr_page$ = this._store.pipe(select(selectCurrentPage));
    this.snapshots$ = this._store.pipe(select(selectCurrentTimeTrialSnapshots));
    this.time_trial$ = this._store.pipe(select(selectSelectedTimeTrial));
    this.time_trial_id$ = this._store.pipe(select(selectSelectedTimeTrialId));
    this.time_trial$
      .pipe(filter(x => x != null), take(1), untilDestroy(this))
      .subscribe(time_trial => this.initTimer(time_trial));
  }



  createSnapshot(time: number): Subscription {
    return this.time_trial_id$
      .pipe(
        filter(x => x != null),
        take(1),
        map(time_trial_id => new Snapshot(time, time_trial_id))
      )
      .subscribe(snapshot => this._store.dispatch(new AddSnapshot({ snapshot })));
  }

  deleteSnapshot(time: number): Subscription {
    return this.time_trial_id$
      .pipe(
        filter(x => x != null),
        take(1),
        map(time_trial_id => new Snapshot(time, time_trial_id))
      )
      .subscribe(snapshot => this._store.dispatch(new DeleteSnapshot({ snapshot })));
  }

  initTimer(time_trial: TimeTrial) {
    switch (time_trial.timing_status) {
      case TimingStatus.running: {
        this.timer = setInterval(() => this.updateTimer(), 10);
        this.updateTimer();
        return;
      }
      case TimingStatus.stopped: {
        this.updateTimer();
      }
    }
  }

  pageResize() {
    const el = this.boats_container.nativeElement as Element;
    const page_size = Math.max(Math.floor(el.clientHeight / 131), 2);
    this._store.dispatch(new SetPageSize({ page_size }));
    this.cdRef.detectChanges();
  }

  toggleTimerState(time_trial: TimeTrial) {
    if (time_trial.timing_status === TimingStatus.reset) {
      time_trial.start_time = moment();
      time_trial.end_time = null;
      time_trial.timing_status = TimingStatus.running;
      this.createSnapshot(moment.duration(0).asMilliseconds());
      this.initTimer(time_trial);
    } else if (time_trial.timing_status === TimingStatus.running) {
      clearInterval(this.timer);
      this.createSnapshot(this.elapsed_time);
      time_trial.end_time = time_trial.start_time.clone().add(this.elapsed_time, 'milliseconds');
      time_trial.timing_status = TimingStatus.stopped;
    } else if (time_trial.timing_status === TimingStatus.stopped) {
      this.reset(time_trial);
      time_trial.timing_status = TimingStatus.reset;
    }
    this._store.dispatch(new UpdateTimeTrial({ time_trial }));
  }

  toggleTimerDescription(time_trial: TimeTrial) {
    if (time_trial == null) {
      return 'Start';
    }
    if (time_trial.timing_status === TimingStatus.reset) {
      return 'Start';
    } else if (time_trial.timing_status === TimingStatus.running) {
      return 'Stop';
    } else if (time_trial.timing_status === TimingStatus.stopped) {
      return 'Reset';
    }
  }

  reset(time_trial: TimeTrial) {
    time_trial.start_time = null;
    this._store.dispatch(new UpdateTimeTrial({ time_trial }));
    this.curr_time = null;
    this.elapsed_time = null;
    this._store.dispatch(new SetCurrentPage({ curr_page: 0 }));
  }

  updateTimer() {
    this.time_trial$
      .pipe(
        take(1),
      ).subscribe(time_trial => {
      this.curr_time = moment();
      if (time_trial.end_time && time_trial.end_time.isValid()) {
        this.elapsed_time = moment.duration(time_trial.end_time.diff(time_trial.start_time)).asMilliseconds();
      } else {
        this.elapsed_time = moment.duration(this.curr_time.diff(time_trial.start_time)).asMilliseconds();
      }
      this.cdRef.markForCheck();
    });
  }

  formatValue(val: number, numZero: number = 2): string {
    let strVal = Math.floor(val).toString();
    while (strVal.length < numZero) {
      strVal = '0' + strVal;
    }
    return strVal.slice(0, 2);
  }

  formatSnapshot(duration: number | null) {
    if (duration == null) {
      return '--:--:--.--';
    }
    const snapshot = moment.duration(duration);

    const hours: string = this.formatValue(Math.floor(snapshot.asHours()));
    const mins = this.formatValue(Math.floor(snapshot.asMinutes() - (Math.floor(snapshot.asHours()) * 60)));
    const seconds = this.formatValue(Math.floor(snapshot.asSeconds() - (Math.floor(snapshot.asMinutes()) * 60)));
    const milliseconds = this.formatValue(snapshot.asMilliseconds() - (Math.floor(snapshot.asSeconds()) * 1000), 3);

    return`${hours}:${mins}:${seconds}.${milliseconds}`;
  }

  takeSnapshot() {
    this.createSnapshot(this.elapsed_time);
  }

  removeStart(boat: Boat) {
    if (boat.start != null) {
      this.createSnapshot(boat.start);
      boat.start = null;
      boat.time = null;
      this._store.dispatch(new UpdateBoat({ boat }));
    }
  }

  removeEnd(boat: Boat) {
    if (boat.end != null) {
      this.createSnapshot(boat.end);
      boat.time = null;
      boat.end = null;
      this._store.dispatch(new UpdateBoat({ boat }));
    }
  }

  updateBoat(boat: Boat) {
    if (boat.start != null && boat.end != null) {
      const duration = moment.duration(boat.end);
      boat.time = duration.clone().subtract(boat.start).asMilliseconds();
    } else {
      boat.time = null;
    }
    this._store.dispatch(new UpdateBoat({ boat }));
  }

  dragStartSnapshot(snapshot: number, boat: Boat = null, location: BoatTime = null) {
    this.dragged_boat = boat;
    this.dragged_start = location;
    this.dragged_snapshot = snapshot;
  }

  clearDraggedData() {
    this.dragged_boat = null;
    this.dragged_start = null;
    this.dragged_snapshot = null;
  }

  removeEventTimeFromDraggedBoat(boat: Boat) {
    switch (this.dragged_start) {
      case BoatTime.start: {
        this.dragged_boat.start = null;
        break;
      }
      case BoatTime.end: {
        this.dragged_boat.end = null;
        break;
      }
    }
    this.dragged_boat.time = null;
    if (boat == null) {
      this.createSnapshot(this.dragged_snapshot);
    }
    this._store.dispatch(new UpdateBoat({ boat: this.dragged_boat }));
  }

  addEventTimeToBoat(dragEvent: CdkDragDrop<number[]>, boat: Boat, location: BoatTime): boolean {
    const snapshot = dragEvent.previousContainer.data[dragEvent.previousIndex];
    if (location === BoatTime.start) {
      if (boat.end != null && (boat.end < snapshot)) {
        console.log('ERROR');
        this.clearDraggedData();
        return false;
      }
      boat.start = this.dragged_snapshot;

    } else if (location === BoatTime.end) {
      if (boat.start != null && boat.start > snapshot) {
        console.log('ERROR');
        this.clearDraggedData();
        return false;
      }
      boat.end = this.dragged_snapshot;
    }

    if (this.dragged_boat == null) {
      this.deleteSnapshot(this.dragged_snapshot);
    }

    if (boat != null) {
      this.updateBoat(boat);
    }
    return true;
  }

  drop(event: CdkDragDrop<number[]>, boat: Boat, location: BoatTime) {
    if (boat == null && location == null) {
      switch (this.dragged_start) {
        case BoatTime.start: {
          return this.removeStart(this.dragged_boat);
        }
        case BoatTime.end: {
          return this.removeEnd(this.dragged_boat);
        }
      }
    }

    if (event.previousContainer === event.container) {
      this.clearDraggedData();
      return;
    }

    this.addEventTimeToBoat(event, boat, location);
    if (this.dragged_boat != null) {
      this.removeEventTimeFromDraggedBoat(boat);
    } else {
      this.deleteSnapshot(this.dragged_snapshot);
    }
    this.clearDraggedData();
  }

  getLists() {
    if (this.lists == null) {
      return [];
    }
    return this.lists.toArray();
  }

  canAddToBoaty(snapshot: Snapshot): ((item: CdkDrag<number>) => boolean) {
    return () => snapshot == null;
  }

  removeSnapshot(snapshot: Snapshot) {
    this._store.dispatch(new DeleteSnapshot({ snapshot }));
  }

  setPage(index: number) {
    this._store.dispatch(new SetCurrentPage({ curr_page: index }));
  }

  scrollSnapshots(direction: 'up' | 'down') {
    const el = this.snapshots_container.nativeElement as Element;
    switch (direction) {
      case 'up': {
        el.scrollTop -= 10;
        break;
      }
      case 'down': {
        el.scrollTop += 10;
        break;
      }
    }
  }

  mouseDownScrollDown() {
    this.scroll_down_interval = setInterval(() => {
      this.scrollSnapshots('down');
      const container_el = this.snapshots_container.nativeElement as Element;
      if (container_el.scrollTop + container_el.clientHeight === container_el.scrollHeight) {
        this.mouseUpScrollDown();
      }
    }, 100);
  }

  mouseUpScrollDown() {
    if (this.scroll_down_interval) {
      clearInterval(this.scroll_down_interval);
    }
  }

  mouseDownScrollUp() {
    this.scroll_up_interval = setInterval(() => {
      this.scrollSnapshots('up');
      const container_el = this.snapshots_container.nativeElement as Element;
      if (container_el.scrollTop === 0) {
        this.mouseUpScrollUp();
      }
    }, 100);
  }

  mouseUpScrollUp() {
    if (this.scroll_up_interval) {
      clearInterval(this.scroll_up_interval);
    }
  }

  getPageArray(len: number) {
    return new Array(len);
  }

  getSnapshots(snapshots: Snapshot[]): number[] {
    return snapshots.map(x => x.time);
  }
}
