import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Rental} from '../models/rental.model';
import {RentalActions, RentalActionTypes} from '../actions/rental.actions';

export interface State extends EntityState<Rental> {
  selected_rental_id: number;
}

function sortByDate(o1: Rental, o2: Rental) {
  return o1.out_time.isBefore(o2.out_time) ? -1 : 1;
}

export const adapter: EntityAdapter<Rental> = createEntityAdapter<Rental>({
  sortComparer: sortByDate
});

export const initialState: State = adapter.getInitialState({
  selected_rental_id: null
});

export function reducer(
  state = initialState,
  action: RentalActions
): State {
  switch (action.type) {
    case RentalActionTypes.GetRentalsForCurrentOrganizationSuccess: {
      return adapter.addAll(action.payload.rentals, state);
    }

    case RentalActionTypes.UpdateRentalSuccess: {
      return adapter.updateOne(action.payload.rental, state);
    }

    case RentalActionTypes.UpdateRentalMessage: {
      return adapter.updateOne(action.payload.rental, state);
    }

    case RentalActionTypes.CreateRentalSuccess: {
      return adapter.addOne(action.payload.rental, state);
    }

    case RentalActionTypes.CreateRentalMessage: {
      return adapter.addOne(action.payload.rental, state);
    }

    case RentalActionTypes.DeleteRentalSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case RentalActionTypes.LoadRental: {
      return adapter.addOne(action.payload.rental, state);
    }

    case RentalActionTypes.LoadRentals: {
      return adapter.addAll(action.payload.rentals, state);
    }

    case RentalActionTypes.ClearRentals: {
      return adapter.removeAll(state);
    }

    case RentalActionTypes.SetSelectedRental: {
      return Object.assign({}, state, { selected_rental_id: action.payload.id });
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: getRentalIds,
  selectEntities: getRentalEntities,
  selectAll: getAllRentals,
  selectTotal: getRentalTotals,
} = adapter.getSelectors();

const getSelectedRentalId = (state: State) => state.selected_rental_id;

const getRentalState = createFeatureSelector('rentals');
export const selectAllRentals = createSelector(getRentalState, getAllRentals);
export const selectSelectedRentalID = createSelector(getRentalState, getSelectedRentalId);
export const selectRentalEntities = createSelector(getRentalState, getRentalEntities);
export const selectSelectedRental = createSelector(
  selectSelectedRentalID,
  selectRentalEntities,
  (selected_id, entities) => entities[selected_id]);
