import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-time-trial-edit',
  templateUrl: './time-trial-edit.component.html',
  styleUrls: ['./time-trial-edit.component.scss']
})
export class TimeTrialEditComponent implements OnInit {

  constructor(private _store: Store<any>) { }

  ngOnInit(): void {
  }

  updateTimeTrial(event) {
    console.log(event);
  }

  cancelUpdate() {
    window.history.back();
  }
}
