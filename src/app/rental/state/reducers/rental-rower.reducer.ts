import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RentalRower} from '../models/rental-rower.model';
import {RentalRowerActions, RentalRowerActionTypes} from '../actions/rental-rower.actions';
import {selectSelectedRentalID} from './rental.reducer';

export interface State extends EntityState<RentalRower> {}

export const adapter: EntityAdapter<RentalRower> = createEntityAdapter<RentalRower>();

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: RentalRowerActions
): State {
  switch (action.type) {

    case RentalRowerActionTypes.CreateRentalRowerSuccess: {
      return adapter.addOne(action.payload.rental_rower, state);
    }

    case RentalRowerActionTypes.CreateRentalRowerMessage: {
      return adapter.addOne(action.payload.rental_rower, state);
    }

    case RentalRowerActionTypes.DeleteRentalRowerSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case RentalRowerActionTypes.LoadRentalRower: {
      return adapter.addOne(action.payload.rental_rower, state);
    }

    case RentalRowerActionTypes.LoadRentalRowers: {
      return adapter.addAll(action.payload.rental_rowers, state);
    }

    case RentalRowerActionTypes.ClearRentalRowers: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: getRentalRowerIds,
  selectEntities: getRentalRowerEntities,
  selectAll: getAllRentalRowers,
  selectTotal: getRentalRowerTotals,
} = adapter.getSelectors();

const getRentalRowerState = createFeatureSelector('rental-rowers');
export const selectAllRentalRowers = createSelector(getRentalRowerState, getAllRentalRowers);
export const selectRentalRowerEntities = createSelector(getRentalRowerState, getRentalRowerEntities);
export const selectRentalRowersForRental = createSelector(
  selectSelectedRentalID,
  selectAllRentalRowers,
  (rental_id, rental_rowers) => rental_rowers.filter(x => x.rental_id === rental_id));
