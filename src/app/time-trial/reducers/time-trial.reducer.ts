import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {TimeTrial} from '../models/time-trial.model';
import {TimeTrialActions, TimeTrialActionTypes} from '../actions/time-trial.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends EntityState<TimeTrial> {
  selected_time_trial_id: number;
}

export const adapter: EntityAdapter<TimeTrial> = createEntityAdapter<TimeTrial>();

export const initialState: State = adapter.getInitialState({
  selected_time_trial_id: null
});

export function reducer(
  state = initialState,
  action: TimeTrialActions
): State {
  switch (action.type) {
    case TimeTrialActionTypes.AddTimeTrial: {
      return adapter.addOne(action.payload.timeTrial, state);
    }

    case TimeTrialActionTypes.UpsertTimeTrial: {
      return adapter.upsertOne(action.payload.timeTrial, state);
    }

    case TimeTrialActionTypes.AddTimeTrials: {
      return adapter.addMany(action.payload.timeTrials, state);
    }

    case TimeTrialActionTypes.UpsertTimeTrials: {
      return adapter.upsertMany(action.payload.timeTrials, state);
    }

    case TimeTrialActionTypes.UpdateTimeTrial: {
      return adapter.updateOne(action.payload.timeTrial, state);
    }

    case TimeTrialActionTypes.UpdateTimeTrials: {
      return adapter.updateMany(action.payload.timeTrials, state);
    }

    case TimeTrialActionTypes.DeleteTimeTrial: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TimeTrialActionTypes.DeleteTimeTrials: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case TimeTrialActionTypes.LoadTimeTrials: {
      return adapter.addAll(action.payload.timeTrials, state);
    }

    case TimeTrialActionTypes.ClearTimeTrials: {
      return adapter.removeAll(state);
    }

    case TimeTrialActionTypes.SetSelectedTimeTrial: {
      return Object.assign({}, state, { selected_time_trial_id: action.payload.id });
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
