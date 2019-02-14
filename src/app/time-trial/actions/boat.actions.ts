import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Boat } from '../models/boat.model';

export enum BoatActionTypes {
  LoadBoats = '[Boat] Load Boats',
  CreateBoat = '[Boat] Create Boat',
  CreateBoatSuccess = '[Boat] Create Boat Success',
  CreateBoatFailure = '[Boat] Create Boat Failure',

  UpdateBoat = '[Boat] Update Boat',
  UpdateBoatSuccess = '[Boat] Update Boat Success',
  UpdateBoatFailure = '[Boat] Update Boat Failure',
  DeleteBoat = '[Boat] Delete Boat',
  ClearBoats = '[Boat] Clear Boats',

  SetCurrentPage = '[Boat] Set Current Page',
  SetPageSize = '[Boat] Set Page Size',
  SetSelectedBoat = '[Boat] Set Selected Boat'
}

export class LoadBoats implements Action {
  readonly type = BoatActionTypes.LoadBoats;

  constructor(public payload: { boats: Boat[] }) {}
}

export class UpdateBoat implements Action {
  readonly type = BoatActionTypes.UpdateBoat;

  constructor(public payload: { boat: Boat }) {}
}

export class UpdateBoatSuccess implements Action {
  readonly type = BoatActionTypes.UpdateBoatSuccess;

  constructor(public payload: { boat: Update<Boat> }) {}
}

export class UpdateBoatFailure implements Action {
  readonly type = BoatActionTypes.UpdateBoatFailure;

  constructor(public payload: { error: any }) {}
}

export class CreateBoat implements Action {
  readonly type = BoatActionTypes.CreateBoat;

  constructor(public payload: { boat: Boat }) {}
}

export class CreateBoatSuccess implements Action {
  readonly type = BoatActionTypes.CreateBoatSuccess;

  constructor(public payload: { boat: Boat }) {}
}

export class CreateBoatFailure implements Action {
  readonly type = BoatActionTypes.CreateBoatFailure;

  constructor(public payload: { error: any }) {}
}

export class DeleteBoat implements Action {
  readonly type = BoatActionTypes.DeleteBoat;

  constructor(public payload: { id: string }) {}
}

export class ClearBoats implements Action {
  readonly type = BoatActionTypes.ClearBoats;
}

export class SetCurrentPage implements Action {
  readonly type = BoatActionTypes.SetCurrentPage;

  constructor(public payload: { curr_page: number }) {}
}

export class SetPageSize implements Action {
  readonly type = BoatActionTypes.SetPageSize;

  constructor(public payload: { page_size: number }) {}
}

export class SetSelectedBoat implements Action {
  readonly type = BoatActionTypes.SetSelectedBoat;

  constructor(public payload: { id: number }) {}
}

export type BoatActions
  = LoadBoats
  | UpdateBoat
  | UpdateBoatSuccess
  | UpdateBoatFailure
  | CreateBoat
  | CreateBoatSuccess
  | CreateBoatFailure
  | UpdateBoat
  | DeleteBoat
  | ClearBoats
  | SetCurrentPage
  | SetPageSize
  | SetSelectedBoat;
