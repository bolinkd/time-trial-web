import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { Moment, Duration } from 'moment';
import * as moment from 'moment';
import {CdkDrag, CdkDragDrop, CdkDropList, transferArrayItem} from '@angular/cdk/drag-drop';

enum TimeState {
  'reset' = 0,
  'running',
  'stopped'
}

class Boaty {
  name: string;
  start: Duration[];
  end: Duration[];
  time: Duration;
  bow_marker: number;

  constructor(name: string, bow_marker: number) {
    this.name = name;
    this.start = [];
    this.end = [];
    this.time = null;
    this.bow_marker = bow_marker;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @ViewChildren('lists') lists: QueryList<CdkDropList>;

  start_time: Moment = null;
  curr_time: Moment = null;
  elapsed_time: Duration;
  time_state: TimeState = TimeState.reset;

  snapshots: Duration[] = [];

  timer: any = null;

  currentBoatys: Boaty[] = [];
  pageSize = 3;
  currPage = 0;
  boatyPages: Boaty[][] = [];
  initalBoatys: Boaty[] = [
    new Boaty('Boat 1', 1),
    new Boaty('Boat 2', 2),
    new Boaty('Boat 3', 3),
    new Boaty('Boat 4', 4),
    new Boaty('Boat 5', 5),
    new Boaty('Boat 6', 6),
    new Boaty('Boat 7', 7),
    new Boaty('Boat 8', 8),
    new Boaty('Boat 9', 9),
    new Boaty('Boat 10', 10),
    new Boaty('Boat 11', 11),
  ];

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.resetBoatyLists();
  }

  toggleTimerState() {
    if (this.time_state === TimeState.reset) {
      this.start_time = moment();
      this.snapshots = [moment.duration(0)];
      this.updateTimer();
      this.timer = setInterval(() => this.updateTimer(), 10);
      this.time_state = TimeState.running;
    } else if (this.time_state === TimeState.running) {
      clearInterval(this.timer);
      this.snapshots = this.snapshots.concat(this.elapsed_time);
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
    this.snapshots = [];
    this.initalBoatys = this.initalBoatys.map(x => ({
      name: x.name,
      start: [],
      end: [],
      time: null,
      bow_marker: x.bow_marker
    }));
    this.resetBoatyLists();
    this.cdRef.markForCheck();
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

  formatDuration(duration: Duration) {
    if (duration == null) {
      return '--:--:--.--';
    }

    const hours: string = this.formatValue(Math.floor(duration.asHours()));
    const mins = this.formatValue(Math.floor(duration.asMinutes() - (Math.floor(duration.asHours()) * 60)));
    const seconds = this.formatValue(Math.floor(duration.asSeconds() - (Math.floor(duration.asMinutes()) * 60)));
    const milliseconds = this.formatValue(duration.asMilliseconds() - (Math.floor(duration.asSeconds()) * 1000), 3);

    return`${hours}:${mins}:${seconds}.${milliseconds}`;
  }

  takeSnapshot() {
    this.snapshots = this.snapshots.concat(this.elapsed_time.clone());
  }

  removeStart(boaty: Boaty) {
    if (boaty.start.length) {
      const idx = this.snapshots.findIndex((val) => val.asMilliseconds() > boaty.start[0].asMilliseconds());
      if (idx < 0) {
        transferArrayItem(boaty.start, this.snapshots, 0, this.snapshots.length);
      } else {
        transferArrayItem(boaty.start, this.snapshots, 0, idx);
      }
      boaty.time = null;
    }
  }

  removeEnd(boaty: Boaty) {
    if (boaty.end.length) {
      const idx = this.snapshots.findIndex((val) => val.asMilliseconds() > boaty.end[0].asMilliseconds());
      if (idx < 0) {
        transferArrayItem(boaty.end, this.snapshots, 0, this.snapshots.length);
      } else {
        transferArrayItem(boaty.end, this.snapshots, 0, idx);
      }
      boaty.time = null;
    }
  }

  updateBoaty(boaty: Boaty) {
    if (boaty.start.length && boaty.end.length) {
      boaty.time = boaty.end[0].clone().subtract(boaty.start[0]);
    }
  }

  drop(event: CdkDragDrop<Duration[]>, boaty: Boaty, location: 'start' | 'end') {
    if (location === 'start') {
      const snapshot = event.previousContainer.data[event.previousIndex];
      if (boaty.end.length && boaty.end[0].asMilliseconds() < snapshot.asMilliseconds()) {
        console.log('ERROR');
        return;
      }
    } else if (location === 'end') {
      const snapshot = event.previousContainer.data[event.previousIndex];
      if (boaty.start.length && boaty.start[0].asMilliseconds() > snapshot.asMilliseconds()) {
        console.log('ERROR');
        return;
      }
    }

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
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

  canAddToBoaty(snapshots: Duration[]): ((item: CdkDrag<number>) => boolean) {
    return () => !snapshots.length;
  }

  removeSnapshot(snapshot: Duration) {
    this.snapshots = this.snapshots.filter(x => x !== snapshot);
  }

  nextPage() {
    this.currPage += 1;
    this.updateBoatyList();
  }

  prevPage() {
    this.currPage -= 1;
    this.updateBoatyList();
  }

  setPage(index: number) {
    this.currPage = index;
    this.updateBoatyList();
  }

  updateBoatyList() {
    this.currentBoatys = this.boatyPages[this.currPage];
  }

  resetBoatyLists() {
    this.boatyPages = [];
    this.currPage = 0;
    const j = this.initalBoatys.length;
    for (let i = 0; i < j; i += this.pageSize) {
      this.boatyPages.push(this.initalBoatys.slice(i, i + this.pageSize));
    }
    if (this.boatyPages.length === 0) {
      this.boatyPages = [[]];
    }

    this.updateBoatyList();
    this.cdRef.markForCheck();
  }
}
