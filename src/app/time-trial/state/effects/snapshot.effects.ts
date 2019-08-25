import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action, select, Store} from '@ngrx/store';
import {map, withLatestFrom} from 'rxjs/operators';
import {selectSnapshots} from '../reducers/snapshot.reducer';
import {LoadSnapshots, LoadSnapshotsLocalStorage, SnapshotActionTypes} from '../actions/snapshot.actions';
import {Snapshot} from '../models/snapshot.model';





@Injectable()
export class SnapshotEffects {

  @Effect({ dispatch: false })
  saveSnapshotsLocalStorage$: Observable<void> = this.actions$
    .pipe(
      ofType(SnapshotActionTypes.AddSnapshot, SnapshotActionTypes.DeleteSnapshot),
      withLatestFrom(this._store.pipe(select(selectSnapshots))),
      map(([_, snapshots]) => {
        localStorage.setItem('snapshots', JSON.stringify(snapshots));
      })
    );

  @Effect()
  getSnapshotsLocalStorage$: Observable<Action> = this.actions$
    .pipe(
      ofType<LoadSnapshotsLocalStorage>(SnapshotActionTypes.LoadSnapshotsLocalStorage),
      map(() => {
        const snapshotsJSON = JSON.parse(localStorage.getItem('snapshots'));
        const snapshots = snapshotsJSON ? snapshotsJSON.map(x => new Snapshot(x.time, x.time_trial_id)) : [];
        return new LoadSnapshots({ snapshots });
      })
    );

  constructor(private actions$: Actions, private _store: Store<any>) {}

}
