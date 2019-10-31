import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {RowerService} from '../../services/rower.service';
import {
  GetRowersForCurrentOrganization,
  GetRowersForCurrentOrganizationFailure,
  GetRowersForCurrentOrganizationSuccess,
  RowerActionTypes
} from '../actions/rower.actions';

@Injectable()
export class RowerEffects {
  @Effect()
  getRowersForCurrentOrganization$: Observable<Action> = this.actions$
    .pipe(
      ofType<GetRowersForCurrentOrganization>(RowerActionTypes.GetRowersForCurrentOrganization),
      switchMap(() => this.rowerService.getRowersForCurrentOrganization()
        .pipe(
          map(resp => new GetRowersForCurrentOrganizationSuccess({ rowers: resp })),
          catchError(error => of(new GetRowersForCurrentOrganizationFailure({ error })))
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
  createTimeTrial$: Observable<Action> = this.actions$
    .pipe(
      ofType<CreateTimeTrial>(TimeTrialActionTypes.CreateTimeTrial),
      switchMap(action => this.timeTrialService.createTimeTrial(action.payload.time_trial)
        .pipe(
          map(time_trial => new CreateTimeTrialSuccess({ time_trial })),
          catchError(error => of(new CreateTimeTrialFailure({ error })))
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

  constructor(private actions$: Actions, private rowerService: RowerService) {}

}
