import {Moment} from 'moment';

export enum TimingStatus {
  'reset' = 0,
  'running',
  'stopped'
}

export enum TimerCount {
  'one' = 1,
  'two'
}

export class TimeTrial {
  id: number = Math.floor(Math.random() * 10000);
  date: Moment;
  start_time: Moment;
  end_time: Moment;
  timing_status: TimingStatus;
  timers: TimerCount = TimerCount.one;
  distance: number;

  constructor(date: Moment, distance: number) {
    this.date = date;
    this.start_time = null;
    this.distance = distance;
  }
}
