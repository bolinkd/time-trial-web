import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Group, GroupTreeData} from '../../state/models/group.model';
import {GetGroupsForCurrentOrganization} from '../../state/actions/group.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {selectCurrentOrganizationClubs, selectSelectedGroup} from '../../state/reducers/group.reducer';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups$: Observable<GroupTreeData[]>;
  currentGroup$: Observable<Group>; 
  treeControl = new FlatTreeControl<GroupTreeData>(
    node => node.level, node => node.expandable);

  treeFlattener: MatTreeFlattener<GroupTreeData, any>;
  dataSource: MatTreeFlatDataSource<GroupTreeData, any>;

  private _transformer = (node: GroupTreeData, level: number): { group: Group, expandable: boolean, name: string, level: number} => {
    return {
      group: node,
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
    };
  }

  constructor(private _store: Store<any>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this._store.dispatch(new GetGroupsForCurrentOrganization());
    this.groups$ = this._store.pipe(select(selectCurrentOrganizationClubs));

    this.treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.groups$.subscribe(x => {
      this.dataSource.data = x;
      this.treeControl.expandAll();
    });

    this.currentGroup$ = this._store.pipe(select(selectSelectedGroup));
  }

  goToGroup(group: Group) {
    console.log(group);
    this.router.navigate(['groups', group.id], { relativeTo: this.route.parent });
  }

  hasChild = (_: number, node: GroupTreeData) => node.expandable;
}
