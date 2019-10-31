import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromShell from './state/reducers/shell.reducer';
import {ShellEffects} from './state/effects/shell.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('shells', fromShell.reducer),
    EffectsModule.forFeature([ShellEffects])
  ]
})
export class ShellNgrxModule { }
