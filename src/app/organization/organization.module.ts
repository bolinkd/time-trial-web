import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganizationNgrxModule} from './organization-ngrx.module';
import {OrganizationEditComponent} from './components/organization-edit/organization-edit.component';
import {AppMaterialModule} from '../material';
import {NgLetModule} from '@ngrx-utils/store';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
  declarations: [
    OrganizationEditComponent
  ],
  exports: [
    OrganizationEditComponent
  ],
  imports: [
    CommonModule,
    OrganizationNgrxModule,
    AppMaterialModule,
    NgLetModule,
    FlexLayoutModule
  ]
})
export class OrganizationModule { }
