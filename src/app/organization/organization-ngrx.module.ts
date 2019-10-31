import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromOrganization from './state/reducers/organization.reducer';
import {OrganizationEffects} from './state/effects/organization.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('organizations', fromOrganization.reducer),
    EffectsModule.forFeature([OrganizationEffects])
  ]
})
export class OrganizationNgrxModule { }
