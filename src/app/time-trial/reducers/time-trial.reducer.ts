import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {TimeTrial} from '../models/time-trial.model';
import {TimeTrialActions, TimeTrialActionTypes} from '../actions/time-trial.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends EntityState<TimeTrial> {
  selected_time_trial_id: number;
}

function sortByDate(t1: TimeTrial, t2: TimeTrial) {
  return t2.date.diff(t1.date);
}

export const adapter: EntityAdapter<TimeTrial> = createEntityAdapter<TimeTrial>({
  sortComparer: sortByDate
});

export const initialState: State = adapter.getInitialState({
  selected_time_trial_id: null
});

export function reducer(
  state = initialState,
  action: TimeTrialActions
): State {
  switch (action.type) {
    case TimeTrialActionTypes.UpdateTimeTrialSuccess: {
      return adapter.updateOne(action.payload.time_trial, state);
    }

    case TimeTrialActionTypes.CreateTimeTrialSuccess: {
      return adapter.addOne(action.payload.time_trial, state);
    }

    case TimeTrialActionTypes.DeleteTimeTrial: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TimeTrialActionTypes.LoadTimeTrials: {
      return adapter.addAll(action.payload.time_trials, state);
    }

    case TimeTrialActionTypes.ClearTimeTrials: {
      return adapter.removeAll(state);
    }

    case TimeTrialActionTypes.SetSelectedTimeTrial: {
      return Object.assign({}, state, { selected_time_trial_id: action.payload.id });
    }

    case TimeTrialActionTypes.GetAllTimeTrialsSuccess: {
      return adapter.addMany(action.payload.time_trials, state);
    }

    case TimeTrialActionTypes.GetTimeTrialByIdSuccess: {
      return adapter.addOne(action.payload.time_trial, state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: getTimeTrialIds,
  selectEntities: getTimeTrialEntities,
  selectAll: getAllTimeTrials,
  selectTotal: getTimeTrialTotal,
} = adapter.getSelectors();

const getSelectedTimeTrialId = (state: State) => state.selected_time_trial_id;

const getTimeTrialState = createFeatureSelector('time-trials');
export const selectAllTimeTrials = createSelector(getTimeTrialState, getAllTimeTrials);
export const selectSelectedTimeTrialId = createSelector(getTimeTrialState, getSelectedTimeTrialId);
export const selectTimeTrialEntities = createSelector(getTimeTrialState, getTimeTrialEntities);
export const selectSelectedTimeTrial = createSelector(
  selectSelectedTimeTrialId,
  selectTimeTrialEntities,
  (selected_id, entities) => entities[selected_id]);
