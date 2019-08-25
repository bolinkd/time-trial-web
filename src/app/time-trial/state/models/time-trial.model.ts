import {Moment} from 'moment';
import {Boat} from './boat.model';
import * as moment from 'moment';

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
  id: number;
  date: Moment;
  start_time: Moment;
  end_time: Moment;
  timing_status: TimingStatus;
  timers: TimerCount = TimerCount.one;
  distance: number;

  constructor(json: any) {
    this.id = json.id;
    this.date = moment.utc(json.date);
    this.start_time = moment.utc(json.start_time);
    this.end_time = moment.utc(json.end_time);
    this.timing_status = json.timing_status;
    this.timers = json.timers;
    this.distance = json.distance;
  }
}

export class TimeTrialWithData extends TimeTrial {
  boats: Boat[];

  constructor(json: any) {
    super(json);
    this.boats = json.boats ? json.boats.map(boat => new Boat(boat)) : [];
  }
}
