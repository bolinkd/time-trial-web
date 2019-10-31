import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Shell } from '../models/shell.model';

export enum ShellActionTypes {
  LoadShell = '[Shell] Load Shell',
  LoadShells = '[Shell] Load Shells',

  GetShellsForCurrentOrganization = '[Shell] Get Shells For Current Organization',
  GetShellsForCurrentOrganizationSuccess = '[Shell] Get Shells For Current Organization Success',
  GetShellsForCurrentOrganizationFailure = '[Shell] Get Shells For Current Organization Failure',

  CreateShell = '[Shell] Create Shell',
  CreateShellSuccess = '[Shell] Create Shell Success',
  CreateShellFailure = '[Shell] Create Shell Failure',
  CreateShellMessage = '[Shell] Create Shell Message',

  UpdateShell = '[Shell] Update Shell',
  UpdateShellSuccess = '[Shell] Update Shell Success',
  UpdateShellFailure = '[Shell] Update Shell Failure',
  UpdateShellMessage = '[Shell] Update Shell Message',

  DeleteShell = '[Shell] Delete Shell',
  DeleteShellSuccess = '[Shell] Delete Shell Success',
  DeleteShellFailure = '[Shell] Delete Shell Failure',
  DeleteShellMessage = '[Shell] Delete Shell Message',

  ClearShells = '[Shell] Clear Shells',
  SetSelectedShell = '[Shell] Set Selected Shell',
}

export class LoadShell implements Action {
  readonly type = ShellActionTypes.LoadShell;

  constructor(public payload: { shell: Shell }) {}
}

export class LoadShells implements Action {
  readonly type = ShellActionTypes.LoadShells;

  constructor(public payload: { shells: Shell[] }) {}
}

export class GetShellsForCurrentOrganization implements Action {
  readonly type = ShellActionTypes.GetShellsForCurrentOrganization;
}

export class GetShellsForCurrentOrganizationSuccess implements Action {
  readonly type = ShellActionTypes.GetShellsForCurrentOrganizationSuccess;

  constructor(public payload: { shells: Shell[] }) {}
}

export class GetShellsForCurrentOrganizationFailure implements Action {
  readonly type = ShellActionTypes.GetShellsForCurrentOrganizationFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateShell implements Action {
  readonly type = ShellActionTypes.UpdateShell;

  constructor(public payload: { shell: Shell }) {}
}

export class UpdateShellSuccess implements Action {
  readonly type = ShellActionTypes.UpdateShellSuccess;

  constructor(public payload: { shell: Update<Shell> }) {}
}

export class UpdateShellFailure implements Action {
  readonly type = ShellActionTypes.UpdateShellFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateShellMessage implements Action {
  readonly type = ShellActionTypes.UpdateShellMessage;

  constructor(public payload: { shell: Update<Shell> }) {}
}

export class CreateShell implements Action {
  readonly type = ShellActionTypes.CreateShell;

  constructor(public payload: { shell: Shell }) {}
}

export class CreateShellSuccess implements Action {
  readonly type = ShellActionTypes.CreateShellSuccess;

  constructor(public payload: { shell: Shell }) {}
}

export class CreateShellFailure implements Action {
  readonly type = ShellActionTypes.CreateShellFailure;

  constructor(public payload: { error: any }) {}
}

export class CreateShellMessage implements Action {
  readonly type = ShellActionTypes.CreateShellMessage;

  constructor(public payload: { shell: Shell }) {}
}

export class DeleteShell implements Action {
  readonly type = ShellActionTypes.DeleteShell;

  constructor(public payload: { id: number }) {}
}

export class DeleteShellSuccess implements Action {
  readonly type = ShellActionTypes.DeleteShellSuccess;

  constructor(public payload: { id: number }) {}
}

export class DeleteShellFailure implements Action {
  readonly type = ShellActionTypes.DeleteShellFailure;

  constructor(public payload: { error: any }) {}
}

export class DeleteShellMessage implements Action {
  readonly type = ShellActionTypes.DeleteShellMessage;

  constructor(public payload: { id: number }) {}
}

export class ClearShells implements Action {
  readonly type = ShellActionTypes.ClearShells;
}

export class SetSelectedShell implements Action {
  readonly type = ShellActionTypes.SetSelectedShell;

  constructor(public payload: { id: number }) {}
}

export type ShellActions
  = LoadShell
  | LoadShells
  | GetShellsForCurrentOrganizationSuccess
  | UpdateShellSuccess
  | UpdateShellMessage
  | CreateShellSuccess
  | CreateShellMessage
  | DeleteShellSuccess
  | DeleteShellMessage
  | ClearShells
  | SetSelectedShell;
