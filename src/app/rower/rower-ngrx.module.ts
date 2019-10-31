import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromRower from './state/reducers/rower.reducer';
import {RowerEffects} from './state/effects/rower.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('rowers', fromRower.reducer),
    EffectsModule.forFeature([RowerEffects])
  ]
})
export class RowerNgrxModule { }
