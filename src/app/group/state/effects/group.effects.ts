import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {
  GetGroupsForCurrentOrganization,
  GetGroupsForCurrentOrganizationFailure,
  GetGroupsForCurrentOrganizationSuccess,
  GroupActionTypes
} from '../actions/group.actions';
import {GroupService} from '../../services/group.service';

@Injectable()
export class GroupEffects {
  @Effect()
  getClubsForCurrentOrganization$: Observable<Action> = this.actions$
    .pipe(
      ofType<GetGroupsForCurrentOrganization>(GroupActionTypes.GetGroupsForCurrentOrganization),
      switchMap(() => this.groupService.getGroupsForCurrentOrganization()
        .pipe(
          map(groups => new GetGroupsForCurrentOrganizationSuccess({ groups })),
          catchError(error => of(new GetGroupsForCurrentOrganizationFailure({ error })))
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

  constructor(private actions$: Actions, private groupService: GroupService) {}

}
