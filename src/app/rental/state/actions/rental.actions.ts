import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Rental } from '../models/rental.model';

export enum RentalActionTypes {
  LoadRental = '[Rental] Load Rental',
  LoadRentals = '[Rental] Load Rentals',

  GetRentalsForCurrentOrganization = '[Rental] Get Rentals For Current Organization',
  GetRentalsForCurrentOrganizationSuccess = '[Rental] Get Rentals For Current Organization Success',
  GetRentalsForCurrentOrganizationFailure = '[Rental] Get Rentals For Current Organization Failure',

  CreateRental = '[Rental] Create Rental',
  CreateRentalSuccess = '[Rental] Create Rental Success',
  CreateRentalFailure = '[Rental] Create Rental Failure',
  CreateRentalMessage = '[Rental] Create Rental Message',

  UpdateRental = '[Rental] Update Rental',
  UpdateRentalSuccess = '[Rental] Update Rental Success',
  UpdateRentalFailure = '[Rental] Update Rental Failure',
  UpdateRentalMessage = '[Rental] Update Rental Message',

  DeleteRental = '[Rental] Delete Rental',
  DeleteRentalSuccess = '[Rental] Delete Rental Success',
  DeleteRentalFailure = '[Rental] Delete Rental Failure',
  DeleteRentalMessage = '[Rental] Delete Rental Message',

  ClearRentals = '[Rental] Clear Rentals',
  SetSelectedRental = '[Rental] Set Selected Rental',
}

export class LoadRental implements Action {
  readonly type = RentalActionTypes.LoadRental;

  constructor(public payload: { rental: Rental }) {}
}

export class LoadRentals implements Action {
  readonly type = RentalActionTypes.LoadRentals;

  constructor(public payload: { rentals: Rental[] }) {}
}

export class GetRentalsForCurrentOrganization implements Action {
  readonly type = RentalActionTypes.GetRentalsForCurrentOrganization;
}

export class GetRentalsForCurrentOrganizationSuccess implements Action {
  readonly type = RentalActionTypes.GetRentalsForCurrentOrganizationSuccess;

  constructor(public payload: { rentals: Rental[] }) {}
}

export class GetRentalsForCurrentOrganizationFailure implements Action {
  readonly type = RentalActionTypes.GetRentalsForCurrentOrganizationFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateRental implements Action {
  readonly type = RentalActionTypes.UpdateRental;

  constructor(public payload: { rental: Rental }) {}
}

export class UpdateRentalSuccess implements Action {
  readonly type = RentalActionTypes.UpdateRentalSuccess;

  constructor(public payload: { rental: Update<Rental> }) {}
}

export class UpdateRentalFailure implements Action {
  readonly type = RentalActionTypes.UpdateRentalFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateRentalMessage implements Action {
  readonly type = RentalActionTypes.UpdateRentalMessage;

  constructor(public payload: { rental: Update<Rental> }) {}
}

export class CreateRental implements Action {
  readonly type = RentalActionTypes.CreateRental;

  constructor(public payload: { rental: Rental }) {}
}

export class CreateRentalSuccess implements Action {
  readonly type = RentalActionTypes.CreateRentalSuccess;

  constructor(public payload: { rental: Rental }) {}
}

export class CreateRentalFailure implements Action {
  readonly type = RentalActionTypes.CreateRentalFailure;

  constructor(public payload: { error: any }) {}
}

export class CreateRentalMessage implements Action {
  readonly type = RentalActionTypes.CreateRentalMessage;

  constructor(public payload: { rental: Rental }) {}
}

export class DeleteRental implements Action {
  readonly type = RentalActionTypes.DeleteRental;

  constructor(public payload: { id: number }) {}
}

export class DeleteRentalSuccess implements Action {
  readonly type = RentalActionTypes.DeleteRentalSuccess;

  constructor(public payload: { id: number }) {}
}

export class DeleteRentalFailure implements Action {
  readonly type = RentalActionTypes.DeleteRentalFailure;

  constructor(public payload: { error: any }) {}
}

export class DeleteRentalMessage implements Action {
  readonly type = RentalActionTypes.DeleteRentalMessage;

  constructor(public payload: { id: number }) {}
}

export class ClearRentals implements Action {
  readonly type = RentalActionTypes.ClearRentals;
}

export class SetSelectedRental implements Action {
  readonly type = RentalActionTypes.SetSelectedRental;

  constructor(public payload: { id: number }) {}
}

export type RentalActions
  = LoadRental
  | LoadRentals
  | GetRentalsForCurrentOrganizationSuccess
  | UpdateRentalSuccess
  | UpdateRentalMessage
  | CreateRentalSuccess
  | CreateRentalMessage
  | DeleteRentalSuccess
  | DeleteRentalMessage
  | ClearRentals
  | SetSelectedRental;
