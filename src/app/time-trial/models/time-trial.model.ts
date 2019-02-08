import {Moment} from 'moment';

export class TimeTrial {
  id: number;
  date: Moment;
  start_time: Moment;

  constructor(date: Moment) {
    this.date = date;
    this.start_time = null;
  }
}
