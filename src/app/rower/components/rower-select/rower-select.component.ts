import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {selectAllRowers} from '../../state/reducers/rower.reducer';
import {Observable} from 'rxjs';
import {Rower} from '../../state/models/rower.model';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-rower-select',
  templateUrl: './rower-select.component.html',
  styleUrls: ['./rower-select.component.scss']
})
export class RowerSelectComponent implements OnInit {

  rowers$: Observable<Rower[]>;

  constructor(private _store: Store<any>, public dialogRef: MatDialogRef<RowerSelectComponent>) { }

  ngOnInit() {
    this.rowers$ = this._store.select(selectAllRowers);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
