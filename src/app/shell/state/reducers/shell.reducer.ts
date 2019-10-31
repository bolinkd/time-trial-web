import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Shell} from '../models/shell.model';
import {ShellActions, ShellActionTypes} from '../actions/shell.actions';
import {selectSelectedGroupID} from '../../../group/state/reducers/group.reducer';

export interface State extends EntityState<Shell> {
  selected_shell_id: number;
}

function sortByDate(o1: Shell, o2: Shell) {
  return o2.name.localeCompare(o1.name);
}

export const adapter: EntityAdapter<Shell> = createEntityAdapter<Shell>({
  sortComparer: sortByDate
});

export const initialState: State = adapter.getInitialState({
  selected_shell_id: null
});

export function reducer(
  state = initialState,
  action: ShellActions
): State {
  switch (action.type) {
    case ShellActionTypes.GetShellsForCurrentOrganizationSuccess: {
      return adapter.addAll(action.payload.shells, state);
    }

    case ShellActionTypes.UpdateShellSuccess: {
      return adapter.updateOne(action.payload.shell, state);
    }

    case ShellActionTypes.UpdateShellMessage: {
      return adapter.updateOne(action.payload.shell, state);
    }

    case ShellActionTypes.CreateShellSuccess: {
      return adapter.addOne(action.payload.shell, state);
    }

    case ShellActionTypes.CreateShellMessage: {
      return adapter.addOne(action.payload.shell, state);
    }

    case ShellActionTypes.DeleteShellSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ShellActionTypes.LoadShell: {
      return adapter.addOne(action.payload.shell, state);
    }

    case ShellActionTypes.LoadShells: {
      return adapter.addAll(action.payload.shells, state);
    }

    case ShellActionTypes.ClearShells: {
      return adapter.removeAll(state);
    }

    case ShellActionTypes.SetSelectedShell: {
      return Object.assign({}, state, { selected_shell_id: action.payload.id });
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: getShellIds,
  selectEntities: getShellEntities,
  selectAll: getAllShells,
  selectTotal: getShellTotals,
} = adapter.getSelectors();

const getSelectedShellId = (state: State) => state.selected_shell_id;

const getShellState = createFeatureSelector('shells');
export const selectAllShells = createSelector(getShellState, getAllShells);
export const selectSelectedShellID = createSelector(getShellState, getSelectedShellId);
export const selectShellEntities = createSelector(getShellState, getShellEntities);
export const selectCurrentShell = createSelector(
  selectSelectedShellID,
  selectShellEntities,
  (selected_id, entities) => entities[selected_id]);
export const selectCurrentGroupShells = createSelector(
  selectSelectedGroupID,
  selectAllShells,
  (group_id, entities) => entities.filter(x => x.group_id === group_id));
