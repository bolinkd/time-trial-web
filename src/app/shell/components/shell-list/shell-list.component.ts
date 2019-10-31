import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Shell, ShellType} from '../../state/models/shell.model';
import {GetShellsForCurrentOrganization} from '../../state/actions/shell.actions';
import {selectCurrentGroupShells} from '../../state/reducers/shell.reducer';

@Component({
  selector: 'app-shell-list',
  templateUrl: './shell-list.component.html',
  styleUrls: ['./shell-list.component.scss']
})
export class ShellListComponent implements OnInit {

  shells$: Observable<Shell[]>;
  ShellType = ShellType;
  constructor(private _store: Store<any>) { }

  ngOnInit() {
    this._store.dispatch(new GetShellsForCurrentOrganization());
    this.shells$ = this._store.pipe(select(selectCurrentGroupShells));
  }
}
