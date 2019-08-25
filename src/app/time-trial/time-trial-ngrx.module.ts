import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSnapshot from './state/reducers/snapshot.reducer';
import * as fromBoat from './state/reducers/boat.reducer';
import * as fromTimeTrial from './state/reducers/time-trial.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TimeTrialEffects} from './state/effects/time-trial.effects';
import {BoatEffects} from './state/effects/boat.effects';
import {SnapshotEffects} from './state/effects/snapshot.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('boats', fromBoat.reducer),
    StoreModule.forFeature('time-trials', fromTimeTrial.reducer),
    StoreModule.forFeature('snapshots', fromSnapshot.reducer),
    EffectsModule.forFeature([TimeTrialEffects, BoatEffects, SnapshotEffects])
  ]
})
export class TimeTrialNgrxModule { }
