import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TimeTrial } from '../models/time-trial.model';

export enum TimeTrialActionTypes {
  GetAllTimeTrials = '[TimeTrial] Get All TimeTrials',
  GetAllTimeTrialsSuccess = '[TimeTrial] Get All TimeTrials Success',
  GetAllTimeTrialsFailure = '[TimeTrial] Get All TimeTrials Failure',

  GetTimeTrialById = '[TimeTrial] Get TimeTrial By Id',
  GetTimeTrialByIdSuccess = '[TimeTrial] Get TimeTrial By Id Success',
  GetTimeTrialByIdFailure = '[TimeTrial] Get TimeTrial By Id Failure',

  CreateTimeTrial = '[TimeTrial] Create TimeTrial',
  CreateTimeTrialSuccess = '[TimeTrial] Create TimeTrial Success',
  CreateTimeTrialFailure = '[TimeTrial] Create TimeTrial Failure',
  CreateTimeTrialMessage = '[TimeTrial] Create TimeTrial Message',

  UpdateTimeTrial = '[TimeTrial] Update TimeTrial',
  UpdateTimeTrialSuccess = '[TimeTrial] Update TimeTrial Success',
  UpdateTimeTrialFailure = '[TimeTrial] Update TimeTrial Failure',
  UpdateTimeTrialMessage = '[TimeTrial] Update TimeTrial Message',

  LoadTimeTrials = '[TimeTrial] Load TimeTrials',
  DeleteTimeTrial = '[TimeTrial] Delete TimeTrial',
  ClearTimeTrials = '[TimeTrial] Clear TimeTrials',

  SetSelectedTimeTrial = '[TimeTrial] Set Selected Time Trial'
}

export class GetTimeTrials implements Action {
  readonly type = TimeTrialActionTypes.GetAllTimeTrials;
}

export class GetTimeTrialsSuccess implements Action {
  readonly type = TimeTrialActionTypes.GetAllTimeTrialsSuccess;

  constructor(public payload: { time_trials: TimeTrial[] }) {}
}

export class GetTimeTrialsFailure implements Action {
  readonly type = TimeTrialActionTypes.GetAllTimeTrialsFailure;

  constructor(public payload: { error: any }) {}
}

export class GetTimeTrialById implements Action {
  readonly type = TimeTrialActionTypes.GetTimeTrialById;

  constructor(public payload: { id: number }) {}
}

export class GetTimeTrialByIdSuccess implements Action {
  readonly type = TimeTrialActionTypes.GetTimeTrialByIdSuccess;

  constructor(public payload: { time_trial: TimeTrial }) {}
}

export class GetTimeTrialByIdFailure implements Action {
  readonly type = TimeTrialActionTypes.GetTimeTrialByIdFailure;

  constructor(public payload: { error: any }) {}
}

export class LoadTimeTrials implements Action {
  readonly type = TimeTrialActionTypes.LoadTimeTrials;

  constructor(public payload: { time_trials: TimeTrial[] }) {}
}

export class CreateTimeTrial implements Action {
  readonly type = TimeTrialActionTypes.CreateTimeTrial;

  constructor(public payload: { time_trial: TimeTrial }) {}
}

export class CreateTimeTrialSuccess implements Action {
  readonly type = TimeTrialActionTypes.CreateTimeTrialSuccess;

  constructor(public payload: { time_trial: TimeTrial }) {}
}

export class CreateTimeTrialFailure implements Action {
  readonly type = TimeTrialActionTypes.CreateTimeTrialFailure;

  constructor(public payload: { error: any }) {}
}

export class CreateTimeTrialMessage implements Action {
  readonly type = TimeTrialActionTypes.CreateTimeTrialMessage;

  constructor(public payload: { time_trial: TimeTrial }) {}
}

export class UpdateTimeTrial implements Action {
  readonly type = TimeTrialActionTypes.UpdateTimeTrial;

  constructor(public payload: { time_trial: TimeTrial }) {}
}

export class UpdateTimeTrialSuccess implements Action {
  readonly type = TimeTrialActionTypes.UpdateTimeTrialSuccess;

  constructor(public payload: { time_trial: Update<TimeTrial> }) {}
}

export class UpdateTimeTrialFailure implements Action {
  readonly type = TimeTrialActionTypes.UpdateTimeTrialFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateTimeTrialMessage implements Action {
  readonly type = TimeTrialActionTypes.UpdateTimeTrialMessage;

  constructor(public payload: { time_trial: Update<TimeTrial> }) {}
}

export class DeleteTimeTrial implements Action {
  readonly type = TimeTrialActionTypes.DeleteTimeTrial;

  constructor(public payload: { id: number }) {}
}

export class ClearTimeTrials implements Action {
  readonly type = TimeTrialActionTypes.ClearTimeTrials;
}

export class SetSelectedTimeTrial implements Action {
  readonly type = TimeTrialActionTypes.SetSelectedTimeTrial;

  constructor(public payload: { id: number }) { }
}

export type TimeTrialActions
  = LoadTimeTrials
  | UpdateTimeTrial
  | UpdateTimeTrialSuccess
  | UpdateTimeTrialFailure
  | UpdateTimeTrialMessage
  | CreateTimeTrial
  | CreateTimeTrialSuccess
  | CreateTimeTrialFailure
  | CreateTimeTrialMessage
  | DeleteTimeTrial
  | ClearTimeTrials
  | SetSelectedTimeTrial
  | GetTimeTrials
  | GetTimeTrialsSuccess
  | GetTimeTrialsFailure
  | GetTimeTrialByIdSuccess;
