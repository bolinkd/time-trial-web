import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {RentalRower} from '../models/rental-rower.model';

export enum RentalRowerActionTypes {
  LoadRentalRower = '[RentalRower] Load RentalRower',
  LoadRentalRowers = '[RentalRower] Load RentalRowers',

  CreateRentalRower = '[RentalRower] Create RentalRower',
  CreateRentalRowerSuccess = '[RentalRower] Create RentalRower Success',
  CreateRentalRowerFailure = '[RentalRower] Create RentalRower Failure',
  CreateRentalRowerMessage = '[RentalRower] Create RentalRower Message',

  DeleteRentalRower = '[RentalRower] Delete RentalRower',
  DeleteRentalRowerSuccess = '[RentalRower] Delete RentalRower Success',
  DeleteRentalRowerFailure = '[RentalRower] Delete RentalRower Failure',
  DeleteRentalRowerMessage = '[RentalRower] Delete RentalRower Message',

  ClearRentalRowers = '[RentalRower] Clear RentalRowers',
}

export class LoadRentalRower implements Action {
  readonly type = RentalRowerActionTypes.LoadRentalRower;

  constructor(public payload: { rental_rower: RentalRower }) {}
}

export class LoadRentalRowers implements Action {
  readonly type = RentalRowerActionTypes.LoadRentalRowers;

  constructor(public payload: { rental_rowers: RentalRower[] }) {}
}

export class CreateRentalRower implements Action {
  readonly type = RentalRowerActionTypes.CreateRentalRower;

  constructor(public payload: { rental_rower: RentalRower }) {}
}

export class CreateRentalRowerSuccess implements Action {
  readonly type = RentalRowerActionTypes.CreateRentalRowerSuccess;

  constructor(public payload: { rental_rower: RentalRower }) {}
}

export class CreateRentalRowerFailure implements Action {
  readonly type = RentalRowerActionTypes.CreateRentalRowerFailure;

  constructor(public payload: { error: any }) {}
}

export class CreateRentalRowerMessage implements Action {
  readonly type = RentalRowerActionTypes.CreateRentalRowerMessage;

  constructor(public payload: { rental_rower: RentalRower }) {}
}

export class DeleteRentalRower implements Action {
  readonly type = RentalRowerActionTypes.DeleteRentalRower;

  constructor(public payload: { id: number }) {}
}

export class DeleteRentalRowerSuccess implements Action {
  readonly type = RentalRowerActionTypes.DeleteRentalRowerSuccess;

  constructor(public payload: { id: number }) {}
}

export class DeleteRentalRowerFailure implements Action {
  readonly type = RentalRowerActionTypes.DeleteRentalRowerFailure;

  constructor(public payload: { error: any }) {}
}

export class DeleteRentalRowerMessage implements Action {
  readonly type = RentalRowerActionTypes.DeleteRentalRowerMessage;

  constructor(public payload: { id: number }) {}
}

export class ClearRentalRowers implements Action {
  readonly type = RentalRowerActionTypes.ClearRentalRowers;
}

export type RentalRowerActions
  = LoadRentalRower
  | LoadRentalRowers
  | CreateRentalRowerSuccess
  | CreateRentalRowerMessage
  | DeleteRentalRowerSuccess
  | DeleteRentalRowerMessage
  | ClearRentalRowers;
