import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Group} from '../../state/models/group.model';
import {filter, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {selectSelectedGroup} from '../../state/reducers/group.reducer';
import {GetGroupsForCurrentOrganization, SetSelectedGroup} from '../../state/actions/group.actions';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {

  groupForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    club_id: new FormControl(null, Validators.required)
  });

  selected_group$: Observable<Group>;
  constructor(private _store: Store<any>, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this._store.dispatch(new SetSelectedGroup({ id }));
    this._store.dispatch(new GetGroupsForCurrentOrganization());
    this.selected_group$ = this._store.select(selectSelectedGroup);
    this.selected_group$
      .pipe(filter(x => x != null), take(1))
      .subscribe((group) => this.resetForm(group));
  }

  resetForm(group: Group) {
    this.groupForm.reset({
      id: group.id,
      name: group.name,
      organization_id: group.organization_id
    });
  }

}
