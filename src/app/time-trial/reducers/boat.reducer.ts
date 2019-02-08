import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Boat} from '../models/boat.model';
import {BoatActions, BoatActionTypes} from '../actions/boat.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends EntityState<Boat> {
  curr_page: number;
  page_size: number;
}

export const adapter: EntityAdapter<Boat> = createEntityAdapter<Boat>();

export const initialState: State = adapter.getInitialState({
  curr_page: 0,
  page_size: 2,
});

export function reducer(
  state = initialState,
  action: BoatActions
): State {
  switch (action.type) {
    case BoatActionTypes.AddBoat: {
      return adapter.addOne(action.payload.boat, state);
    }

    case BoatActionTypes.UpsertBoat: {
      return adapter.upsertOne(action.payload.boat, state);
    }

    case BoatActionTypes.AddBoats: {
      return adapter.addMany(action.payload.boats, state);
    }

    case BoatActionTypes.UpsertBoats: {
      return adapter.upsertMany(action.payload.boats, state);
    }

    case BoatActionTypes.UpdateBoat: {
      return adapter.updateOne(action.payload.boat, state);
    }

    case BoatActionTypes.UpdateBoats: {
      return adapter.updateMany(action.payload.boats, state);
    }

    case BoatActionTypes.DeleteBoat: {
      return adapter.removeOne(action.payload.id, state);
    }

    case BoatActionTypes.DeleteBoats: {
      return adapter.removeMany(action.payload.ids, state);
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

export const selectBoatState = createFeatureSelector<State>('boats');
export const selectAllBoats = createSelector(selectBoatState, getAllBoats);
export const selectCurrentPage = createSelector(selectBoatState, getCurrentPage);
export const selectPageSize = createSelector(selectBoatState, getPageSize);
export const selectBoatPageCount = createSelector(
  selectAllBoats,
  selectPageSize,
  (all_boats: Boat[], page_size: number) => Math.ceil(all_boats.length / page_size)
);
export const selectCurrentBoats = createSelector(
  selectAllBoats,
  selectCurrentPage,
  selectPageSize,
  (all_boats: Boat[], curr_page: number, page_size: number) =>
    all_boats.slice(curr_page * page_size, (curr_page + 1) * page_size)
);
