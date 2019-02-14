import { Action } from '@ngrx/store';
import {Snapshot} from '../models/snapshot.model';

export enum SnapshotActionTypes {
  LoadSnapshots = '[Snapshot] Load Snapshot',
  LoadSnapshotsLocalStorage = '[Snapshot] Load Snapshots Local Storage',
  AddSnapshot = '[Snapshot] Add Snapshot',
  DeleteSnapshot = '[Snapshot] Delete Snapshot',
  ClearSnapshots = '[Snapshot] Clear Snapshots'
}

export class LoadSnapshots implements Action {
  readonly type = SnapshotActionTypes.LoadSnapshots;

  constructor(public payload: { snapshots: Snapshot[] }) {}
}

export class LoadSnapshotsLocalStorage implements Action {
  readonly type = SnapshotActionTypes.LoadSnapshotsLocalStorage;
}

export class AddSnapshot implements Action {
  readonly type = SnapshotActionTypes.AddSnapshot;

  constructor(public payload: { snapshot: Snapshot }) {}
}

export class DeleteSnapshot implements Action {
  readonly type = SnapshotActionTypes.DeleteSnapshot;

  constructor(public payload: { snapshot: Snapshot }) {}
}

export class ClearSnapshots implements Action {
  readonly type = SnapshotActionTypes.ClearSnapshots;
}

export type SnapshotActions
  = LoadSnapshots
  | AddSnapshot
  | DeleteSnapshot
  | ClearSnapshots;
