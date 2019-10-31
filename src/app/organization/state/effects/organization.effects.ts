import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {
  GetCurrentOrganization, GetCurrentOrganizationFailure,
  GetCurrentOrganizationSuccess,
  GetOrganizations, GetOrganizationsFailure, GetOrganizationsSuccess,
  OrganizationActionTypes, SetCurrentOrganization
} from '../actions/organization.actions';
import {OrganizationService} from '../../services/organization.service';
import {Organization} from '../models/organization.model';

@Injectable()
export class OrganizationEffects {
  @Effect()
  getCurrentOrganization$: Observable<Action> = this.actions$
    .pipe(
      ofType<GetCurrentOrganization>(OrganizationActionTypes.GetCurrentOrganization),
      switchMap(() => this.organizationService.getCurrentOrganization()
        .pipe(
          mergeMap(resp => {
            const organization = resp as Organization;
            return [
              new SetCurrentOrganization({ id: organization.id }),
              new GetCurrentOrganizationSuccess({ organization })
            ];
          }),
          catchError(error => of(new GetCurrentOrganizationFailure({ error })))
        ))
    );

  @Effect()
  getOrganizations$: Observable<Action> = this.actions$
    .pipe(
      ofType<GetOrganizations>(OrganizationActionTypes.GetOrganizations),
      switchMap(() => this.organizationService.getOrganizations()
        .pipe(
          map(organizations => new GetOrganizationsSuccess({ organizations })),
          catchError(error => of(new GetOrganizationsFailure({ error })))
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

  constructor(private actions$: Actions, private organizationService: OrganizationService) {}

}
