import { Action } from '@ngrx/store';

export enum SnapshotActionTypes {
  LoadSnapshots = '[Snapshot] Load Snapshots',
  AddSnapshot = '[Snapshot] Add Snapshot',
  DeleteSnapshot = '[Snapshot] Delete Snapshot',
  ClearSnapshots = '[Snapshot] Clear Snapshots'
}

export class LoadSnapshots implements Action {
  readonly type = SnapshotActionTypes.LoadSnapshots;

  constructor(public payload: { snapshots: number[] }) {}
}

export class AddSnapshot implements Action {
  readonly type = SnapshotActionTypes.AddSnapshot;

  constructor(public payload: { snapshot: number }) {}
}

export class DeleteSnapshot implements Action {
  readonly type = SnapshotActionTypes.DeleteSnapshot;

  constructor(public payload: { snapshot: number }) {}
}

export class ClearSnapshots implements Action {
  readonly type = SnapshotActionTypes.ClearSnapshots;
}

export type SnapshotActions =
 LoadSnapshots
 | AddSnapshot
 | DeleteSnapshot
 | ClearSnapshots;
