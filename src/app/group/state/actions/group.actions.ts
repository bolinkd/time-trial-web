import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Group } from '../models/group.model';

export enum GroupActionTypes {
  LoadGroup = '[Group] Load Group',
  LoadGroups = '[Group] Load Groups',

  GetGroupsForCurrentOrganization = '[Group] Get Groups For Current Organization',
  GetGroupsForCurrentOrganizationSuccess = '[Group] Get Groups For Current Organization Success',
  GetGroupsForCurrentOrganizationFailure = '[Group] Get Groups For Current Organization Failure',

  CreateGroup = '[Group] Create Group',
  CreateGroupSuccess = '[Group] Create Group Success',
  CreateGroupFailure = '[Group] Create Group Failure',
  CreateGroupMessage = '[Group] Create Group Message',

  UpdateGroup = '[Group] Update Group',
  UpdateGroupSuccess = '[Group] Update Group Success',
  UpdateGroupFailure = '[Group] Update Group Failure',
  UpdateGroupMessage = '[Group] Update Group Message',

  DeleteGroup = '[Group] Delete Group',
  DeleteGroupSuccess = '[Group] Delete Group Success',
  DeleteGroupFailure = '[Group] Delete Group Failure',
  DeleteGroupMessage = '[Group] Delete Group Message',

  ClearGroups = '[Group] Clear Groups',
  SetSelectedGroup = '[Group] Set Selected Group',
}

export class LoadGroup implements Action {
  readonly type = GroupActionTypes.LoadGroup;

  constructor(public payload: { group: Group }) {}
}

export class LoadGroups implements Action {
  readonly type = GroupActionTypes.LoadGroups;

  constructor(public payload: { groups: Group[] }) {}
}

export class GetGroupsForCurrentOrganization implements Action {
  readonly type = GroupActionTypes.GetGroupsForCurrentOrganization;
}

export class GetGroupsForCurrentOrganizationSuccess implements Action {
  readonly type = GroupActionTypes.GetGroupsForCurrentOrganizationSuccess;

  constructor(public payload: { groups: Group[] }) {}
}

export class GetGroupsForCurrentOrganizationFailure implements Action {
  readonly type = GroupActionTypes.GetGroupsForCurrentOrganizationFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateGroup implements Action {
  readonly type = GroupActionTypes.UpdateGroup;

  constructor(public payload: { group: Group }) {}
}

export class UpdateGroupSuccess implements Action {
  readonly type = GroupActionTypes.UpdateGroupSuccess;

  constructor(public payload: { group: Update<Group> }) {}
}

export class UpdateGroupFailure implements Action {
  readonly type = GroupActionTypes.UpdateGroupFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateGroupMessage implements Action {
  readonly type = GroupActionTypes.UpdateGroupMessage;

  constructor(public payload: { group: Update<Group> }) {}
}

export class CreateGroup implements Action {
  readonly type = GroupActionTypes.CreateGroup;

  constructor(public payload: { group: Group }) {}
}

export class CreateGroupSuccess implements Action {
  readonly type = GroupActionTypes.CreateGroupSuccess;

  constructor(public payload: { group: Group }) {}
}

export class CreateGroupFailure implements Action {
  readonly type = GroupActionTypes.CreateGroupFailure;

  constructor(public payload: { error: any }) {}
}

export class CreateGroupMessage implements Action {
  readonly type = GroupActionTypes.CreateGroupMessage;

  constructor(public payload: { group: Group }) {}
}

export class DeleteGroup implements Action {
  readonly type = GroupActionTypes.DeleteGroup;

  constructor(public payload: { id: number }) {}
}

export class DeleteGroupSuccess implements Action {
  readonly type = GroupActionTypes.DeleteGroupSuccess;

  constructor(public payload: { id: number }) {}
}

export class DeleteGroupFailure implements Action {
  readonly type = GroupActionTypes.DeleteGroupFailure;

  constructor(public payload: { error: any }) {}
}

export class DeleteGroupMessage implements Action {
  readonly type = GroupActionTypes.DeleteGroupMessage;

  constructor(public payload: { id: number }) {}
}

export class ClearGroups implements Action {
  readonly type = GroupActionTypes.ClearGroups;
}

export class SetSelectedGroup implements Action {
  readonly type = GroupActionTypes.SetSelectedGroup;

  constructor(public payload: { id: number }) {}
}

export type GroupActions
  = LoadGroup
  | LoadGroups
  | GetGroupsForCurrentOrganizationSuccess
  | UpdateGroupSuccess
  | UpdateGroupMessage
  | CreateGroupSuccess
  | CreateGroupMessage
  | DeleteGroupSuccess
  | DeleteGroupMessage
  | ClearGroups
  | SetSelectedGroup;
