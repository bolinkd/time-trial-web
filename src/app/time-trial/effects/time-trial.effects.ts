import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap, switchMap, take} from 'rxjs/operators';
import {TimeTrialService} from '../services/time-trial.service';
import {TimeTrial} from '../models/time-trial.model';
import {
  CreateTimeTrial, CreateTimeTrialFailure, CreateTimeTrialSuccess,
  GetTimeTrialById, GetTimeTrialByIdFailure,
  GetTimeTrialByIdSuccess,
  GetTimeTrials, GetTimeTrialsFailure,
  GetTimeTrialsSuccess,
  TimeTrialActionTypes, UpdateTimeTrial, UpdateTimeTrialFailure, UpdateTimeTrialSuccess
} from '../actions/time-trial.actions';
import {LoadBoats} from '../actions/boat.actions';
import {Update} from '@ngrx/entity';





@Injectable()
export class TimeTrialEffects {

  @Effect()
  getAllTimeTrials$: Observable<Action> = this.actions$
    .pipe(
      ofType<GetTimeTrials>(TimeTrialActionTypes.GetAllTimeTrials),
      switchMap(() => this.timeTrialService.getTimeTrials()
        .pipe(
          mergeMap(resp => {
            const time_trials =  resp.map(x => (x as TimeTrial));
            const boats = [].concat.apply([], resp.map(x => x.boats));
            return [
              new GetTimeTrialsSuccess({ time_trials }),
              new LoadBoats({ boats })
            ];
          }),
          catchError(error => of(new GetTimeTrialsFailure({ error })))
        ))
    );

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

  constructor(private actions$: Actions, private timeTrialService: TimeTrialService) {}

}
