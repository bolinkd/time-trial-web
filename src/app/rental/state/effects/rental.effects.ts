import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {RentalService} from '../../services/rental.service';
import {
  CreateRental, CreateRentalFailure, CreateRentalSuccess,
  GetRentalsForCurrentOrganization,
  GetRentalsForCurrentOrganizationFailure,
  GetRentalsForCurrentOrganizationSuccess,
  RentalActionTypes, UpdateRental, UpdateRentalFailure, UpdateRentalSuccess
} from '../actions/rental.actions';
import {Rental} from '../models/rental.model';
import {LoadRentalRowers} from '../actions/rental-rower.actions';

@Injectable()
export class RentalEffects {
  @Effect()
  getRentalsForCurrentOrganization$: Observable<Action> = this.actions$
    .pipe(
      ofType<GetRentalsForCurrentOrganization>(RentalActionTypes.GetRentalsForCurrentOrganization),
      switchMap(() => this.rentalService.getRentalsForCurrentOrganization()
        .pipe(
          mergeMap(resp => {
            const rentals = resp.map(x => x as Rental);
            const rental_rowers = [].concat.apply([], resp.map(x => x.rental_rowers)).filter(x => x != null);
            return [
              new GetRentalsForCurrentOrganizationSuccess({ rentals }),
              new LoadRentalRowers({ rental_rowers }),
            ];
          }),
          catchError(error => of(new GetRentalsForCurrentOrganizationFailure({ error })))
        ))
    );

  @Effect()
  createRental$: Observable<Action> = this.actions$
    .pipe(
      ofType<CreateRental>(RentalActionTypes.CreateRental),
      switchMap(action => this.rentalService.createRental(action.payload.rental)
        .pipe(
          map(rental => new CreateRentalSuccess({ rental })),
          catchError(error => of(new CreateRentalFailure({ error })))
        ))
    );

  @Effect()
  updateRental$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateRental>(RentalActionTypes.UpdateRental),
      switchMap(action => this.rentalService.updateRental(action.payload.rental)
        .pipe(
          map(rental => new UpdateRentalSuccess({
            rental: {
              id: rental.id,
              changes: rental,
            }
          })),
          catchError(error => of(new UpdateRentalFailure({ error })))
        ))
    );

  /*
  @Effect()
  getTimeTrialById$: Observable<Action> = this.actions$
    .pipe(
      ofType<GetTimeTrialById>(TimeTrialActionTypes.GetTimeTrialById),
      switchMap(action => this.timeTrialService.getTimeTrialById(action.payload.id)
        .pipe(
          mergeMap(resp => {
            const time_trial =  resp as TimeTrial;
            const boats = resp.boats;
            return [
              new GetTimeTrialByIdSuccess({ time_trial }),
              new LoadBoats({ boats })
            ];
          }),
          catchError(error => of(new GetTimeTrialByIdFailure({ error })))
        ))
    );

  @Effect()
  updateTimeTrial$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateTimeTrial>(TimeTrialActionTypes.UpdateTimeTrial),
      switchMap(action => this.timeTrialService.updateTimeTrial(action.payload.time_trial)
        .pipe(
          map(resp => {
            const time_trial: Update<TimeTrial> = { id: resp.id, changes: resp };
            return new UpdateTimeTrialSuccess({ time_trial });
          }),
          catchError(error => of(new UpdateTimeTrialFailure({ error })))
        ))
    );
   */

  constructor(private actions$: Actions, private rentalService: RentalService) {}

}
