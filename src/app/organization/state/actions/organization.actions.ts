import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Organization } from '../models/organization.model';

export enum OrganizationActionTypes {
  LoadOrganization = '[Organization] Load Organization',
  LoadOrganizations = '[Organization] Load Organizations',

  GetCurrentOrganization = '[Organization] Get Current Organization',
  GetCurrentOrganizationSuccess = '[Organization] Get Current Organization Success',
  GetCurrentOrganizationFailure = '[Organization] Get Current Organization Failure',

  GetOrganizations = '[Organization] Get Organizations',
  GetOrganizationsSuccess = '[Organization] Get Organizations Success',
  GetOrganizationsFailure = '[Organization] Get Organizations Failure',

  CreateOrganization = '[Organization] Create Organization',
  CreateOrganizationSuccess = '[Organization] Create Organization Success',
  CreateOrganizationFailure = '[Organization] Create Organization Failure',
  CreateOrganizationMessage = '[Organization] Create Organization Message',

  UpdateOrganization = '[Organization] Update Organization',
  UpdateOrganizationSuccess = '[Organization] Update Organization Success',
  UpdateOrganizationFailure = '[Organization] Update Organization Failure',
  UpdateOrganizationMessage = '[Organization] Update Organization Message',

  DeleteOrganization = '[Organization] Delete Organization',
  DeleteOrganizationSuccess = '[Organization] Delete Organization Success',
  DeleteOrganizationFailure = '[Organization] Delete Organization Failure',
  DeleteOrganizationMessage = '[Organization] Delete Organization Message',

  ClearOrganizations = '[Organization] Clear Organizations',
  SetCurrentOrganization = '[Organization] Set Current Organization',
}

export class LoadOrganization implements Action {
  readonly type = OrganizationActionTypes.LoadOrganization;

  constructor(public payload: { organization: Organization }) {}
}

export class LoadOrganizations implements Action {
  readonly type = OrganizationActionTypes.LoadOrganizations;

  constructor(public payload: { organizations: Organization[] }) {}
}

export class GetCurrentOrganization implements Action {
  readonly type = OrganizationActionTypes.GetCurrentOrganization;
}

export class GetCurrentOrganizationSuccess implements Action {
  readonly type = OrganizationActionTypes.GetCurrentOrganizationSuccess;

  constructor(public payload: { organization: Organization }) {}
}

export class GetCurrentOrganizationFailure implements Action {
  readonly type = OrganizationActionTypes.GetCurrentOrganizationFailure;

  constructor(public payload: { error: any }) {}
}

export class GetOrganizations implements Action {
  readonly type = OrganizationActionTypes.GetOrganizations;
}

export class GetOrganizationsSuccess implements Action {
  readonly type = OrganizationActionTypes.GetOrganizationsSuccess;

  constructor(public payload: { organizations: Organization[] }) {}
}

export class GetOrganizationsFailure implements Action {
  readonly type = OrganizationActionTypes.GetOrganizationsFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateOrganization implements Action {
  readonly type = OrganizationActionTypes.UpdateOrganization;

  constructor(public payload: { organization: Organization }) {}
}

export class UpdateOrganizationSuccess implements Action {
  readonly type = OrganizationActionTypes.UpdateOrganizationSuccess;

  constructor(public payload: { organization: Update<Organization> }) {}
}

export class UpdateOrganizationFailure implements Action {
  readonly type = OrganizationActionTypes.UpdateOrganizationFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateOrganizationMessage implements Action {
  readonly type = OrganizationActionTypes.UpdateOrganizationMessage;

  constructor(public payload: { organization: Update<Organization> }) {}
}

export class CreateOrganization implements Action {
  readonly type = OrganizationActionTypes.CreateOrganization;

  constructor(public payload: { organization: Organization }) {}
}

export class CreateOrganizationSuccess implements Action {
  readonly type = OrganizationActionTypes.CreateOrganizationSuccess;

  constructor(public payload: { organization: Organization }) {}
}

export class CreateOrganizationFailure implements Action {
  readonly type = OrganizationActionTypes.CreateOrganizationFailure;

  constructor(public payload: { error: any }) {}
}

export class CreateOrganizationMessage implements Action {
  readonly type = OrganizationActionTypes.CreateOrganizationMessage;

  constructor(public payload: { organization: Organization }) {}
}

export class DeleteOrganization implements Action {
  readonly type = OrganizationActionTypes.DeleteOrganization;

  constructor(public payload: { id: number }) {}
}

export class DeleteOrganizationSuccess implements Action {
  readonly type = OrganizationActionTypes.DeleteOrganizationSuccess;

  constructor(public payload: { id: number }) {}
}

export class DeleteOrganizationFailure implements Action {
  readonly type = OrganizationActionTypes.DeleteOrganizationFailure;

  constructor(public payload: { error: any }) {}
}

export class DeleteOrganizationMessage implements Action {
  readonly type = OrganizationActionTypes.DeleteOrganizationMessage;

  constructor(public payload: { id: number }) {}
}

export class ClearOrganizations implements Action {
  readonly type = OrganizationActionTypes.ClearOrganizations;
}

export class SetCurrentOrganization implements Action {
  readonly type = OrganizationActionTypes.SetCurrentOrganization;

  constructor(public payload: { id: number }) {}
}

export type OrganizationActions
  = LoadOrganization
  | LoadOrganizations
  | GetCurrentOrganizationSuccess
  | GetOrganizationsSuccess
  | UpdateOrganizationSuccess
  | UpdateOrganizationMessage
  | CreateOrganizationSuccess
  | CreateOrganizationMessage
  | DeleteOrganizationSuccess
  | DeleteOrganizationMessage
  | ClearOrganizations
  | SetCurrentOrganization;
