import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Boat } from '../models/boat.model';

export enum BoatActionTypes {
  LoadBoats = '[Boat] Load Boats',
  AddBoat = '[Boat] Add Boat',
  UpsertBoat = '[Boat] Upsert Boat',
  AddBoats = '[Boat] Add Boats',
  UpsertBoats = '[Boat] Upsert Boats',
  UpdateBoat = '[Boat] Update Boat',
  UpdateBoats = '[Boat] Update Boats',
  DeleteBoat = '[Boat] Delete Boat',
  DeleteBoats = '[Boat] Delete Boats',
  ClearBoats = '[Boat] Clear Boats',

  SetCurrentPage = '[Boat] Set Current Page',
  SetPageSize = '[Boat] Set Page Size'
}

export class LoadBoats implements Action {
  readonly type = BoatActionTypes.LoadBoats;

  constructor(public payload: { boats: Boat[] }) {}
}

export class AddBoat implements Action {
  readonly type = BoatActionTypes.AddBoat;

  constructor(public payload: { boat: Boat }) {}
}

export class UpsertBoat implements Action {
  readonly type = BoatActionTypes.UpsertBoat;

  constructor(public payload: { boat: Boat }) {}
}

export class AddBoats implements Action {
  readonly type = BoatActionTypes.AddBoats;

  constructor(public payload: { boats: Boat[] }) {}
}

export class UpsertBoats implements Action {
  readonly type = BoatActionTypes.UpsertBoats;

  constructor(public payload: { boats: Boat[] }) {}
}

export class UpdateBoat implements Action {
  readonly type = BoatActionTypes.UpdateBoat;

  constructor(public payload: { boat: Update<Boat> }) {}
}

export class UpdateBoats implements Action {
  readonly type = BoatActionTypes.UpdateBoats;

  constructor(public payload: { boats: Update<Boat>[] }) {}
}

export class DeleteBoat implements Action {
  readonly type = BoatActionTypes.DeleteBoat;

  constructor(public payload: { id: string }) {}
}

export class DeleteBoats implements Action {
  readonly type = BoatActionTypes.DeleteBoats;

  constructor(public payload: { ids: string[] }) {}
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

export type BoatActions
  = LoadBoats
  | AddBoat
  | UpsertBoat
  | AddBoats
  | UpsertBoats
  | UpdateBoat
  | UpdateBoats
  | DeleteBoat
  | DeleteBoats
  | ClearBoats
  | SetCurrentPage
  | SetPageSize;
