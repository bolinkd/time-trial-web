import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import {SnapshotActions, SnapshotActionTypes} from '../actions/snapshot.actions';
import {Snapshot} from '../models/snapshot.model';
import {selectSelectedTimeTrialId} from './time-trial.reducer';

export interface State {
  snapshots: Snapshot[];
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
        snapshots: state.snapshots.concat(action.payload.snapshot).sort((x, y) => x.time - y.time)
      });
    }

    case SnapshotActionTypes.DeleteSnapshot: {
      const snapshots = state.snapshots;
      return Object.assign({}, state, {
        snapshots: snapshots
          .filter(snapshot => {
            const time_trial_id_match = snapshot.time_trial_id === action.payload.snapshot.time_trial_id;
            const time_match = snapshot.time === action.payload.snapshot.time;
            return !(time_trial_id_match && time_match);
          })
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
export const selectCurrentTimeTrialSnapshots = createSelector(
  selectSnapshots,
  selectSelectedTimeTrialId,
  (snapshots, time_trial_id) => snapshots.filter(x => x.time_trial_id === time_trial_id)
);
