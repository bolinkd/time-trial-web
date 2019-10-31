import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Organization} from '../models/organization.model';
import {OrganizationActions, OrganizationActionTypes} from '../actions/organization.actions';

export interface State extends EntityState<Organization> {
  current_organization_id: number;
}

function sortByDate(o1: Organization, o2: Organization) {
  return o2.name.localeCompare(o1.name);
}

export const adapter: EntityAdapter<Organization> = createEntityAdapter<Organization>({
  sortComparer: sortByDate
});

export const initialState: State = adapter.getInitialState({
  current_organization_id: null
});

export function reducer(
  state = initialState,
  action: OrganizationActions
): State {
  switch (action.type) {
    case OrganizationActionTypes.GetCurrentOrganizationSuccess: {
      return adapter.addOne(action.payload.organization, state);
    }

    case OrganizationActionTypes.GetOrganizationsSuccess: {
      return adapter.addAll(action.payload.organizations, state);
    }

    case OrganizationActionTypes.UpdateOrganizationSuccess: {
      return adapter.updateOne(action.payload.organization, state);
    }

    case OrganizationActionTypes.UpdateOrganizationMessage: {
      return adapter.updateOne(action.payload.organization, state);
    }

    case OrganizationActionTypes.CreateOrganizationSuccess: {
      return adapter.addOne(action.payload.organization, state);
    }

    case OrganizationActionTypes.CreateOrganizationMessage: {
      return adapter.addOne(action.payload.organization, state);
    }

    case OrganizationActionTypes.DeleteOrganizationSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case OrganizationActionTypes.LoadOrganization: {
      return adapter.addOne(action.payload.organization, state);
    }

    case OrganizationActionTypes.LoadOrganizations: {
      return adapter.addAll(action.payload.organizations, state);
    }

    case OrganizationActionTypes.ClearOrganizations: {
      return adapter.removeAll(state);
    }

    case OrganizationActionTypes.SetCurrentOrganization: {
      return Object.assign({}, state, { current_organization_id: action.payload.id });
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: getOrganizationIds,
  selectEntities: getOrganizationEntities,
  selectAll: getAllOrganizations,
  selectTotal: getOrganizationTotals,
} = adapter.getSelectors();

const getCurrentOrganizationId = (state: State) => state.current_organization_id;

const getOrganizationState = createFeatureSelector('organizations');
export const selectAllOrganizations = createSelector(getOrganizationState, getAllOrganizations);
export const selectCurrentOrganizationID = createSelector(getOrganizationState, getCurrentOrganizationId);
export const selectOrganizationEntities = createSelector(getOrganizationState, getOrganizationEntities);
export const selectCurrentOrganization = createSelector(
  selectCurrentOrganizationID,
  selectOrganizationEntities,
  (current_id, entities) => entities[current_id]);
