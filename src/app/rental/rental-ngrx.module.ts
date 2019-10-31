import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromRental from './state/reducers/rental.reducer';
import * as fromRentalRower from './state/reducers/rental-rower.reducer';
import {RentalEffects} from './state/effects/rental.effects';
import {RentalRowerEffects} from './state/effects/rental-rower.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('rentals', fromRental.reducer),
    StoreModule.forFeature('rental-rowers', fromRentalRower.reducer),
    EffectsModule.forFeature([RentalEffects, RentalRowerEffects])
  ]
})
export class RentalNgrxModule { }
