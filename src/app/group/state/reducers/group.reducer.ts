import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Group, GroupTreeData} from '../models/group.model';
import {GroupActions, GroupActionTypes} from '../actions/group.actions';
import {selectCurrentOrganizationID} from '../../../organization/state/reducers/organization.reducer';

export interface State extends EntityState<Group> {
  selected_group_id: number;
}

function sortByDate(o1: Group, o2: Group) {
  return o1.id - o2.id;
}

export const adapter: EntityAdapter<Group> = createEntityAdapter<Group>({
  sortComparer: sortByDate
});

export const initialState: State = adapter.getInitialState({
  selected_group_id: null
});

export function reducer(
  state = initialState,
  action: GroupActions
): State {
  switch (action.type) {
    case GroupActionTypes.GetGroupsForCurrentOrganizationSuccess: {
      return adapter.addAll(action.payload.groups, state);
    }

    case GroupActionTypes.UpdateGroupSuccess: {
      return adapter.updateOne(action.payload.group, state);
    }

    case GroupActionTypes.UpdateGroupMessage: {
      return adapter.updateOne(action.payload.group, state);
    }

    case GroupActionTypes.CreateGroupSuccess: {
      return adapter.addOne(action.payload.group, state);
    }

    case GroupActionTypes.CreateGroupMessage: {
      return adapter.addOne(action.payload.group, state);
    }

    case GroupActionTypes.DeleteGroupSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case GroupActionTypes.DeleteGroupMessage: {
      return adapter.removeOne(action.payload.id, state);
    }

    case GroupActionTypes.LoadGroup: {
      return adapter.addOne(action.payload.group, state);
    }

    case GroupActionTypes.LoadGroups: {
      return adapter.addAll(action.payload.groups, state);
    }

    case GroupActionTypes.ClearGroups: {
      return adapter.removeAll(state);
    }

    case GroupActionTypes.SetSelectedGroup: {
      return Object.assign({}, state, { selected_group_id: action.payload.id });
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: getGroupIds,
  selectEntities: getGroupEntities,
  selectAll: getAllGroups,
  selectTotal: getGroupTotals,
} = adapter.getSelectors();

const getSelectedGroupID = (state: State) => state.selected_group_id;

const getGroupState = createFeatureSelector('groups');
export const selectAllGroups = createSelector(getGroupState, getAllGroups);
export const selectSelectedGroupID = createSelector(getGroupState, getSelectedGroupID);
export const selectGroupEntities = createSelector(getGroupState, getGroupEntities);
export const selectSelectedGroup = createSelector(
  selectSelectedGroupID,
  selectGroupEntities,
  (selected_id, entities) => entities[selected_id]);
export const selectCurrentOrganizationClubs = createSelector(
  selectCurrentOrganizationID,
  selectAllGroups,
  (organization_id, groups) => {
    const org_groups = groups.filter(x => x.organization_id === organization_id);
    const rtn: GroupTreeData[] = [];
    const getParent = (id: number) => org_groups.find(x => x.id === id);
    const getChildren = (parent: Group) => {
      const child_groups = org_groups.filter(y => y.parent_id === parent.id);
      return child_groups.map(x => new GroupTreeData(x, parent, getChildren(x)));
    };
    for (const group of org_groups.filter(x => x.parent_id == null)) {
      rtn.push(new GroupTreeData(group, getParent(group.parent_id), getChildren(group)));
    }
    return rtn;
  });

export const selectCurrentGroupSubGroups = createSelector(
  selectSelectedGroupID,
  selectAllGroups,
  (current_group_id, groups) => {
    const parent = groups.find(x => x.id === current_group_id);
    const subGroups = groups.filter(x => x.parent_id === current_group_id);
    const getChildren = (subGroup: Group) => {
      const child_groups = groups.filter(y => y.parent_id === subGroup.id);
      return child_groups.map(x => new GroupTreeData(x, subGroup, getChildren(x)));
    };
    const rtn: GroupTreeData[] = [];
    for (const group of subGroups) {
      rtn.push(new GroupTreeData(group, parent, getChildren(parent)));
    }
    return rtn;
  });
