import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {RentalRowerService} from '../../services/rental-rower.service';
import {
  CreateRentalRower,
  CreateRentalRowerFailure,
  CreateRentalRowerSuccess, DeleteRentalRower, DeleteRentalRowerFailure, DeleteRentalRowerSuccess,
  RentalRowerActionTypes
} from '../actions/rental-rower.actions';

@Injectable()
export class RentalRowerEffects {

  @Effect()
  createRentalRower$: Observable<Action> = this.actions$
    .pipe(
      ofType<CreateRentalRower>(RentalRowerActionTypes.CreateRentalRower),
      switchMap(action => this.rentalRowerService.createRental(action.payload.rental_rower)
        .pipe(
          map(rental_rower => new CreateRentalRowerSuccess({ rental_rower })),
          catchError(error => of(new CreateRentalRowerFailure({ error })))
        ))
    );

  @Effect()
  deleteRentalRower$: Observable<Action> = this.actions$
    .pipe(
      ofType<DeleteRentalRower>(RentalRowerActionTypes.DeleteRentalRower),
      switchMap(action => this.rentalRowerService.deleteRentalRower(action.payload.id)
        .pipe(
          map(id => new DeleteRentalRowerSuccess({ id })),
          catchError(error => of(new DeleteRentalRowerFailure({ error })))
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

  constructor(private actions$: Actions, private rentalRowerService: RentalRowerService) {}

}
