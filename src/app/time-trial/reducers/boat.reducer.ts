import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Boat} from '../models/boat.model';
import {BoatActions, BoatActionTypes} from '../actions/boat.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {selectSelectedTimeTrialId} from './time-trial.reducer';

export interface State extends EntityState<Boat> {
  curr_page: number;
  page_size: number;
  selected_boat_id: number;
}

function sortByBowMarker(t1: Boat, t2: Boat) {
  return t1.bow_marker - t2.bow_marker;
}

export const adapter: EntityAdapter<Boat> = createEntityAdapter<Boat>({
  sortComparer: sortByBowMarker
});

export const initialState: State = adapter.getInitialState({
  curr_page: 0,
  page_size: 2,
  selected_boat_id: null,
});

export function reducer(
  state = initialState,
  action: BoatActions
): State {
  switch (action.type) {
    case BoatActionTypes.CreateBoatSuccess: {
      return adapter.addOne(action.payload.boat, state);
    }

    case BoatActionTypes.UpdateBoatSuccess: {
      return adapter.updateOne(action.payload.boat, state);
    }

    case BoatActionTypes.DeleteBoat: {
      return adapter.removeOne(action.payload.id, state);
    }

    case BoatActionTypes.LoadBoats: {
      return adapter.addAll(action.payload.boats, state);
    }

    case BoatActionTypes.ClearBoats: {
      return adapter.removeAll(state);
    }

    case BoatActionTypes.SetCurrentPage: {
      return Object.assign({}, state, { curr_page: action.payload.curr_page });
    }

    case BoatActionTypes.SetPageSize: {
      return Object.assign({}, state, { page_size: action.payload.page_size });
    }

    case BoatActionTypes.SetSelectedBoat: {
      return Object.assign({}, state, { selected_boat_id: action.payload.id });
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: getBoatIds,
  selectEntities: getBoatEntities,
  selectAll: getAllBoats,
  selectTotal: getBoatsTotal
} = adapter.getSelectors();


export const getCurrentPage = (state: State) => state.curr_page;
export const getPageSize = (state: State) => state.page_size;
export const getSelectedBoatId = (state: State) => state.selected_boat_id;

export const selectBoatState = createFeatureSelector<State>('boats');
export const selectAllBoats = createSelector(selectBoatState, getAllBoats);
export const selectBoatEntities = createSelector(selectBoatState, getBoatEntities);
export const selectCurrentTimeTrialBoats = createSelector(
  selectAllBoats,
  selectSelectedTimeTrialId,
  (all_boats: Boat[], time_trial_id: number) => all_boats.filter(boat => boat.time_trial_id === time_trial_id)
);
export const selectCurrentPage = createSelector(selectBoatState, getCurrentPage);
export const selectPageSize = createSelector(selectBoatState, getPageSize);
export const selectSelectedBoatId = createSelector(selectBoatState, getSelectedBoatId);
export const selectBoatPageCount = createSelector(
  selectCurrentTimeTrialBoats,
  selectPageSize,
  (all_boats: Boat[], page_size: number) => Math.ceil(all_boats.length / page_size)
);
export const selectCurrentBoats = createSelector(
  selectCurrentTimeTrialBoats,
  selectCurrentPage,
  selectPageSize,
  (all_boats: Boat[], curr_page: number, page_size: number) =>
    all_boats.slice(curr_page * page_size, (curr_page + 1) * page_size)
);

export const selectSelectedBoat = createSelector(
  selectBoatEntities,
  selectSelectedBoatId,
  (boats, selected_boat_id) => boats[selected_boat_id]
);
