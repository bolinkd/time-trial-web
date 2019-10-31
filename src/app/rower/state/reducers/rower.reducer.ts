import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Rower} from '../models/rower.model';
import {RowerActions, RowerActionTypes} from '../actions/rower.actions';
import {selectSelectedGroupID} from '../../../group/state/reducers/group.reducer';
import {selectCurrentOrganizationID} from '../../../organization/state/reducers/organization.reducer';

export interface State extends EntityState<Rower> {
  selected_rower_id: number;
}

function sortByDate(o1: Rower, o2: Rower) {
  return o2.last_name.localeCompare(o1.last_name);
}

export const adapter: EntityAdapter<Rower> = createEntityAdapter<Rower>({
  sortComparer: sortByDate
});

export const initialState: State = adapter.getInitialState({
  selected_rower_id: null
});

export function reducer(
  state = initialState,
  action: RowerActions
): State {
  switch (action.type) {
    case RowerActionTypes.GetRowersForCurrentOrganizationSuccess: {
      return adapter.addAll(action.payload.rowers, state);
    }

    case RowerActionTypes.UpdateRowerSuccess: {
      return adapter.updateOne(action.payload.rower, state);
    }

    case RowerActionTypes.UpdateRowerMessage: {
      return adapter.updateOne(action.payload.rower, state);
    }

    case RowerActionTypes.CreateRowerSuccess: {
      return adapter.addOne(action.payload.rower, state);
    }

    case RowerActionTypes.CreateRowerMessage: {
      return adapter.addOne(action.payload.rower, state);
    }

    case RowerActionTypes.DeleteRowerSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case RowerActionTypes.LoadRower: {
      return adapter.addOne(action.payload.rower, state);
    }

    case RowerActionTypes.LoadRowers: {
      return adapter.addAll(action.payload.rowers, state);
    }

    case RowerActionTypes.ClearRowers: {
      return adapter.removeAll(state);
    }

    case RowerActionTypes.SetSelectedRower: {
      return Object.assign({}, state, { selected_rower_id: action.payload.id });
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: getRowerIds,
  selectEntities: getRowerEntities,
  selectAll: getAllRowers,
  selectTotal: getRowerTotals,
} = adapter.getSelectors();

const getSelectedRowerId = (state: State) => state.selected_rower_id;

const getRowerState = createFeatureSelector('rowers');
export const selectAllRowers = createSelector(getRowerState, getAllRowers);
export const selectSelectedRowerID = createSelector(getRowerState, getSelectedRowerId);
export const selectRowerEntities = createSelector(getRowerState, getRowerEntities);
export const selectCurrentRower = createSelector(
  selectSelectedRowerID,
  selectRowerEntities,
  (selected_id, entities) => entities[selected_id]);
export const selectCurrentOrganizationRowers = createSelector(
  selectCurrentOrganizationID,
  selectAllRowers,
  (organization_id, entities) => entities.filter(x => x.organization_id === organization_id));
