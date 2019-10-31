import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Rower } from '../models/rower.model';

export enum RowerActionTypes {
  LoadRower = '[Rower] Load Rower',
  LoadRowers = '[Rower] Load Rowers',

  GetRowersForCurrentOrganization = '[Rower] Get Rowers For Current Organization',
  GetRowersForCurrentOrganizationSuccess = '[Rower] Get Rowers For Current Organization Success',
  GetRowersForCurrentOrganizationFailure = '[Rower] Get Rowers For Current Organization Failure',

  CreateRower = '[Rower] Create Rower',
  CreateRowerSuccess = '[Rower] Create Rower Success',
  CreateRowerFailure = '[Rower] Create Rower Failure',
  CreateRowerMessage = '[Rower] Create Rower Message',

  UpdateRower = '[Rower] Update Rower',
  UpdateRowerSuccess = '[Rower] Update Rower Success',
  UpdateRowerFailure = '[Rower] Update Rower Failure',
  UpdateRowerMessage = '[Rower] Update Rower Message',

  DeleteRower = '[Rower] Delete Rower',
  DeleteRowerSuccess = '[Rower] Delete Rower Success',
  DeleteRowerFailure = '[Rower] Delete Rower Failure',
  DeleteRowerMessage = '[Rower] Delete Rower Message',

  ClearRowers = '[Rower] Clear Rowers',
  SetSelectedRower = '[Rower] Set Selected Rower',
}

export class LoadRower implements Action {
  readonly type = RowerActionTypes.LoadRower;

  constructor(public payload: { rower: Rower }) {}
}

export class LoadRowers implements Action {
  readonly type = RowerActionTypes.LoadRowers;

  constructor(public payload: { rowers: Rower[] }) {}
}

export class GetRowersForCurrentOrganization implements Action {
  readonly type = RowerActionTypes.GetRowersForCurrentOrganization;
}

export class GetRowersForCurrentOrganizationSuccess implements Action {
  readonly type = RowerActionTypes.GetRowersForCurrentOrganizationSuccess;

  constructor(public payload: { rowers: Rower[] }) {}
}

export class GetRowersForCurrentOrganizationFailure implements Action {
  readonly type = RowerActionTypes.GetRowersForCurrentOrganizationFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateRower implements Action {
  readonly type = RowerActionTypes.UpdateRower;

  constructor(public payload: { rower: Rower }) {}
}

export class UpdateRowerSuccess implements Action {
  readonly type = RowerActionTypes.UpdateRowerSuccess;

  constructor(public payload: { rower: Update<Rower> }) {}
}

export class UpdateRowerFailure implements Action {
  readonly type = RowerActionTypes.UpdateRowerFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateRowerMessage implements Action {
  readonly type = RowerActionTypes.UpdateRowerMessage;

  constructor(public payload: { rower: Update<Rower> }) {}
}

export class CreateRower implements Action {
  readonly type = RowerActionTypes.CreateRower;

  constructor(public payload: { rower: Rower }) {}
}

export class CreateRowerSuccess implements Action {
  readonly type = RowerActionTypes.CreateRowerSuccess;

  constructor(public payload: { rower: Rower }) {}
}

export class CreateRowerFailure implements Action {
  readonly type = RowerActionTypes.CreateRowerFailure;

  constructor(public payload: { error: any }) {}
}

export class CreateRowerMessage implements Action {
  readonly type = RowerActionTypes.CreateRowerMessage;

  constructor(public payload: { rower: Rower }) {}
}

export class DeleteRower implements Action {
  readonly type = RowerActionTypes.DeleteRower;

  constructor(public payload: { id: number }) {}
}

export class DeleteRowerSuccess implements Action {
  readonly type = RowerActionTypes.DeleteRowerSuccess;

  constructor(public payload: { id: number }) {}
}

export class DeleteRowerFailure implements Action {
  readonly type = RowerActionTypes.DeleteRowerFailure;

  constructor(public payload: { error: any }) {}
}

export class DeleteRowerMessage implements Action {
  readonly type = RowerActionTypes.DeleteRowerMessage;

  constructor(public payload: { id: number }) {}
}

export class ClearRowers implements Action {
  readonly type = RowerActionTypes.ClearRowers;
}

export class SetSelectedRower implements Action {
  readonly type = RowerActionTypes.SetSelectedRower;

  constructor(public payload: { id: number }) {}
}

export type RowerActions
  = LoadRower
  | LoadRowers
  | GetRowersForCurrentOrganizationSuccess
  | UpdateRowerSuccess
  | UpdateRowerMessage
  | CreateRowerSuccess
  | CreateRowerMessage
  | DeleteRowerSuccess
  | DeleteRowerMessage
  | ClearRowers
  | SetSelectedRower;
