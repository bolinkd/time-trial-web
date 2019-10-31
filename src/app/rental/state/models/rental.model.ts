import {Moment} from 'moment';
import {Shell} from '../../../shell/state/models/shell.model';
import * as moment from 'moment';

export class Rental {
  id: number;
  shell_id: number;
  in_time: Moment;
  out_time: Moment;

  constructor(json: any) {
    this.id = json.id;
    this.shell_id = json.shell_id;
    this.in_time = json.in_time ? moment(json.in_time, moment.ISO_8601) : null;
    this.out_time = json.out_time ? moment(json.out_time, moment.ISO_8601) : null;
  }
}

export class RentalWithData extends Rental {
  shell: Shell;
  rental_rowers: any[];

  constructor(json: any) {
    super(json);
    this.shell = new Shell(json.shell);
    this.rental_rowers = json.rental_rowers;
  }
}
