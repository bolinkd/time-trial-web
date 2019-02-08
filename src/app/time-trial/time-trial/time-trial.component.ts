import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Moment} from 'moment';
import {CdkDrag, CdkDragDrop, CdkDropList, transferArrayItem} from '@angular/cdk/drag-drop';
import * as moment from 'moment';
import {Boat} from '../models/boat.model';
import {select, Store} from '@ngrx/store';
import {AddBoats, ClearBoats, SetCurrentPage, SetPageSize, UpdateBoat} from '../actions/boat.actions';
import {Observable} from 'rxjs';
import {selectBoatPageCount, selectCurrentBoats, selectCurrentPage} from '../reducers/boat.reducer';
import {AddSnapshot, ClearSnapshots, DeleteSnapshot, LoadSnapshots} from '../actions/snapshot.actions';
import {Snapshot} from '../models/snapshot.model';
import {selectSnapshots} from '../reducers/snapshot.reducer';

enum TimeState {
  'reset' = 0,
  'running',
  'stopped'
}

@Component({
  selector: 'app-time-trial',
  templateUrl: './time-trial.component.html',
  styleUrls: ['./time-trial.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeTrialComponent implements OnInit, AfterViewInit {
  @ViewChildren('lists') lists: QueryList<CdkDropList>;
  @ViewChild('snapshotsContainer') snapshots_container: ElementRef;
  @ViewChild('boatsContainer') boats_container: ElementRef;
  @ViewChild('scrollUpButton') scroll_up_button: ElementRef;
  @ViewChild('scrollDownButton') scroll_down_button: ElementRef;

  start_time: Moment = null;
  curr_time: Moment = null;
  elapsed_time: Snapshot = null;
  time_state: TimeState = TimeState.reset;

  scroll_down_interval = null;
  scroll_up_interval = null;

  timer: any = null;

  current_boats$: Observable<Boat[]>;
  boat_page_count$: Observable<number>;
  curr_page$: Observable<number>;
  snapshots$: Observable<number[]>;

  initial_boats: Boat[] = [
    new Boat('Boat 1', 1),
    new Boat('Boat 2', 2),
    new Boat('Boat 3', 3),
    new Boat('Boat 4', 4),
    new Boat('Boat 5', 5),
    new Boat('Boat 6', 6),
    new Boat('Boat 7', 7),
    new Boat('Boat 8', 8),
    new Boat('Boat 9', 9),
    new Boat('Boat 10', 10),
    new Boat('Boat 11', 11),
  ];

  @HostListener('window:resize') onResize() {
    this.pageResize();
  }

  constructor(private cdRef: ChangeDetectorRef, private _store: Store<any>) { }

  ngOnInit(): void {
    this._store.dispatch(new ClearBoats());
    this._store.dispatch(new AddBoats({ boats: this.initial_boats }));
    this.current_boats$ = this._store.pipe(select(selectCurrentBoats));
    this.boat_page_count$ = this._store.pipe(select(selectBoatPageCount));
    this.curr_page$ = this._store.pipe(select(selectCurrentPage));
    this.snapshots$ = this._store.pipe(select(selectSnapshots));
  }

  ngAfterViewInit(): void {
    this.pageResize();
  }

  pageResize() {
    const el = this.boats_container.nativeElement as Element;
    const page_size = Math.max(Math.floor(el.clientHeight / 131), 1);
    this._store.dispatch(new SetPageSize({ page_size }));
    this.cdRef.detectChanges();
  }

  toggleTimerState() {
    if (this.time_state === TimeState.reset) {
      this.start_time = moment();
      this._store.dispatch(new AddSnapshot({ snapshot: moment.duration(0).asMilliseconds() }));
      this.updateTimer();
      this.timer = setInterval(() => this.updateTimer(), 10);
      this.time_state = TimeState.running;
    } else if (this.time_state === TimeState.running) {
      clearInterval(this.timer);
      this._store.dispatch(new AddSnapshot({ snapshot: this.elapsed_time.asMilliseconds() }));
      this.time_state = TimeState.stopped;
    } else if (this.time_state === TimeState.stopped) {
      this.reset();
      this.time_state = TimeState.reset;
    }
  }

  toggleTimerDescription() {
    if (this.time_state === TimeState.reset) {
      return 'Start';
    } else if (this.time_state === TimeState.running) {
      return 'Stop';
    } else if (this.time_state === TimeState.stopped) {
      return 'Reset';
    }
  }

  reset() {
    this.start_time = null;
    this.curr_time = null;
    this.elapsed_time = null;
    this._store.dispatch(new ClearSnapshots());
    this.initial_boats = this.initial_boats.map(x => new Boat(x.name, x.bow_marker));
    this._store.dispatch(new SetCurrentPage({ curr_page: 0 }));
  }

  updateTimer() {
    this.curr_time = moment();
    this.elapsed_time = moment.duration(this.curr_time.diff(this.start_time));
    this.cdRef.markForCheck();
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
    this._store.dispatch(new AddSnapshot({ snapshot: this.elapsed_time.clone().asMilliseconds() }));
  }

  removeStart(boaty: Boat, snapshots: number[]) {
    if (boaty.start != null) {
      const idx = snapshots.findIndex(val => val > boaty.start[0]);
      if (idx < 0) {
        transferArrayItem([boaty.start], snapshots, 0, snapshots.length);
      } else {
        transferArrayItem([boaty.start], snapshots, 0, idx);
      }
      boaty.start = null;
      boaty.time = null;
      this._store.dispatch(new LoadSnapshots({ snapshots }));
      this._store.dispatch(new UpdateBoat({ boat: { id: boaty.id, changes: boaty }}));
    }
  }

  removeEnd(boaty: Boat, snapshots: number[]) {
    if (boaty.end != null) {
      const idx = snapshots.findIndex(val => val > boaty.end[0]);
      if (idx < 0) {
        transferArrayItem([boaty.end], snapshots, 0, snapshots.length);
      } else {
        transferArrayItem([boaty.end], snapshots, 0, idx);
      }
      boaty.time = null;
      boaty.end = null;
      this._store.dispatch(new LoadSnapshots({ snapshots }));
      this._store.dispatch(new UpdateBoat({ boat: { id: boaty.id, changes: boaty }}));
    }
  }

  updateBoaty(boaty: Boat) {
    if (boaty.start != null && boaty.end != null) {
      const duration = moment.duration(boaty.end);
      boaty.time = duration.clone().subtract(boaty.start).asMilliseconds();
    } else {
      boaty.time = null;
    }
    this._store.dispatch(new UpdateBoat({ boat: { id: boaty.id, changes: boaty }}));
  }

  drop(event: CdkDragDrop<number[]>, boaty: Boat, location: 'start' | 'end') {
    const snapshot = event.previousContainer.data[event.previousIndex];
    if (location === 'start') {
      if (boaty.end != null && boaty.end < snapshot) {
        console.log('ERROR');
        return;
      }
      boaty.start = snapshot;
      this._store.dispatch(new UpdateBoat({ boat: { id: boaty.id, changes: boaty }}));
      this._store.dispatch(new DeleteSnapshot({ snapshot }));

    } else if (location === 'end') {
      if (boaty.start != null && boaty.start > snapshot) {
        console.log('ERROR');
        return;
      }
      boaty.end = snapshot;
      this._store.dispatch(new UpdateBoat({ boat: { id: boaty.id, changes: boaty }}));
      this._store.dispatch(new DeleteSnapshot({ snapshot }));
    }

    if (boaty != null) {
      this.updateBoaty(boaty);
    }
  }

  getLists() {
    if (this.lists == null) {
      return [];
    }
    return this.lists.toArray();
  }

  alwaysFalse(x: any) {
    return false;
  }

  canAddToBoaty(snapshot: number | null): ((item: CdkDrag<number>) => boolean) {
    return () => snapshot == null;
  }

  removeSnapshot(snapshot: number) {
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
}
