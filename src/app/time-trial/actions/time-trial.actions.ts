import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TimeTrial } from '../models/time-trial.model';

export enum TimeTrialActionTypes {
  LoadTimeTrials = '[TimeTrial] Load TimeTrials',
  AddTimeTrial = '[TimeTrial] Add TimeTrial',
  UpsertTimeTrial = '[TimeTrial] Upsert TimeTrial',
  AddTimeTrials = '[TimeTrial] Add TimeTrials',
  UpsertTimeTrials = '[TimeTrial] Upsert TimeTrials',
  UpdateTimeTrial = '[TimeTrial] Update TimeTrial',
  UpdateTimeTrials = '[TimeTrial] Update TimeTrials',
  DeleteTimeTrial = '[TimeTrial] Delete TimeTrial',
  DeleteTimeTrials = '[TimeTrial] Delete TimeTrials',
  ClearTimeTrials = '[TimeTrial] Clear TimeTrials'
}

export class LoadTimeTrials implements Action {
  readonly type = TimeTrialActionTypes.LoadTimeTrials;

  constructor(public payload: { timeTrials: TimeTrial[] }) {}
}

export class AddTimeTrial implements Action {
  readonly type = TimeTrialActionTypes.AddTimeTrial;

  constructor(public payload: { timeTrial: TimeTrial }) {}
}

export class UpsertTimeTrial implements Action {
  readonly type = TimeTrialActionTypes.UpsertTimeTrial;

  constructor(public payload: { timeTrial: TimeTrial }) {}
}

export class AddTimeTrials implements Action {
  readonly type = TimeTrialActionTypes.AddTimeTrials;

  constructor(public payload: { timeTrials: TimeTrial[] }) {}
}

export class UpsertTimeTrials implements Action {
  readonly type = TimeTrialActionTypes.UpsertTimeTrials;

  constructor(public payload: { timeTrials: TimeTrial[] }) {}
}

export class UpdateTimeTrial implements Action {
  readonly type = TimeTrialActionTypes.UpdateTimeTrial;

  constructor(public payload: { timeTrial: Update<TimeTrial> }) {}
}

export class UpdateTimeTrials implements Action {
  readonly type = TimeTrialActionTypes.UpdateTimeTrials;

  constructor(public payload: { timeTrials: Update<TimeTrial>[] }) {}
}

export class DeleteTimeTrial implements Action {
  readonly type = TimeTrialActionTypes.DeleteTimeTrial;

  constructor(public payload: { id: string }) {}
}

export class DeleteTimeTrials implements Action {
  readonly type = TimeTrialActionTypes.DeleteTimeTrials;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearTimeTrials implements Action {
  readonly type = TimeTrialActionTypes.ClearTimeTrials;
}

export type TimeTrialActions =
 LoadTimeTrials
 | AddTimeTrial
 | UpsertTimeTrial
 | AddTimeTrials
 | UpsertTimeTrials
 | UpdateTimeTrial
 | UpdateTimeTrials
 | DeleteTimeTrial
 | DeleteTimeTrials
 | ClearTimeTrials;
