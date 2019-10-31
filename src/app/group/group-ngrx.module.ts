import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromGroup from './state/reducers/group.reducer';
import {GroupEffects} from './state/effects/group.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('groups', fromGroup.reducer),
    EffectsModule.forFeature([GroupEffects])
  ]
})
export class GroupNgrxModule { }
