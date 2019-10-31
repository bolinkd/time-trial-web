import {Rower} from '../../../rower/state/models/rower.model';
import {Rental} from './rental.model';

export class RentalRower {
  id: number;
  rental_id: number;
  rower_id: number;

  constructor(json: any) {
    this.id = json.id;
    this.rental_id = json.rental_id;
    this.rower_id = json.rower_id;
  }
}

export class RentalRowerWithData extends RentalRower {
  rental: Rental;
  rower: Rower;

  constructor(json: any) {
    super(json);
    this.rental = new Rental(json.rental);
    this.rower = new Rower(json.rower);
  }
}
