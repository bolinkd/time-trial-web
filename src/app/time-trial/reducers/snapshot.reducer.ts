import { SnapshotActions, SnapshotActionTypes } from '../actions/snapshot.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as moment from 'moment';

export interface State {
  snapshots: number[];
}

export const initialState: State = {
  snapshots: [],
};

export function reducer(
  state = initialState,
  action: SnapshotActions
): State {
  switch (action.type) {
    case SnapshotActionTypes.AddSnapshot: {
      return Object.assign({}, state, {
        snapshots: state.snapshots.concat(action.payload.snapshot)
      });
    }

    case SnapshotActionTypes.DeleteSnapshot: {
      const snapshots = state.snapshots;
      return Object.assign({}, state, {
        snapshots: snapshots.filter(x => x !== action.payload.snapshot)
      });
    }

    case SnapshotActionTypes.LoadSnapshots: {
      return Object.assign({}, state, { snapshots: action.payload.snapshots });
    }

    case SnapshotActionTypes.ClearSnapshots: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getSnapshots = (state: State) => state.snapshots;

export const selectSnapshotState = createFeatureSelector<State>('snapshots');
export const selectSnapshots = createSelector(selectSnapshotState, getSnapshots);
