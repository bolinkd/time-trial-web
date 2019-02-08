import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TimeTrial } from '../models/time-trial.model';
import { TimeTrialActions, TimeTrialActionTypes } from '../actions/time-trial.actions';

export interface State extends EntityState<TimeTrial> {
  // additional entities state properties
}

export const adapter: EntityAdapter<TimeTrial> = createEntityAdapter<TimeTrial>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
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

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
