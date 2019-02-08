import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSnapshot from './reducers/snapshot.reducer';
import * as fromBoat from './reducers/boat.reducer';
import * as fromTimeTrial from './reducers/time-trial.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('boats', fromBoat.reducer),
    StoreModule.forFeature('time-trials', fromTimeTrial.reducer),
    StoreModule.forFeature('snapshots', fromSnapshot.reducer),
  ]
})
export class TimeTrialNgrxModule { }
