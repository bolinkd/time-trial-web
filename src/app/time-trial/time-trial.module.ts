import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTrialListComponent } from './components/time-trial-list/time-trial-list.component';
import { TimeTrialEditComponent } from './components/time-trial-edit/time-trial-edit.component';
import { TimeTrialCreateComponent } from './components/time-trial-create/time-trial-create.component';
import { TimeTrialComponent } from './components/time-trial/time-trial.component';
import {TimeTrialRoutingModule} from './time-trial-routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TimeTrialNgrxModule} from './time-trial-ngrx.module';
import {NgLetModule} from '@ngrx-utils/store';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {TimeTrialFormComponent} from './components/time-trial-form/time-trial-form.component';
import {TimeTrialBoatsComponent} from './components/time-trial-boats/time-trial-boats.component';
import {TimeTrialBoatsEditComponent} from './components/time-trial-boats-edit/time-trial-boats-edit.component';
import {TimeTrialBoatsCreateComponent} from './components/time-trial-boats-create/time-trial-boats-create.component';
import {TimeTrialBoatsFormComponent} from './components/time-trial-boats-form/time-trial-boats-form.component';
import {AppMaterialModule} from '../material';

@NgModule({
  declarations: [
    TimeTrialListComponent,
    TimeTrialEditComponent,
    TimeTrialCreateComponent,
    TimeTrialComponent,
    TimeTrialFormComponent,
    TimeTrialBoatsComponent,
    TimeTrialBoatsEditComponent,
    TimeTrialBoatsCreateComponent,
    TimeTrialBoatsFormComponent
  ],
  imports: [
    CommonModule,
    TimeTrialRoutingModule,
    TimeTrialNgrxModule,
    FlexLayoutModule,
    DragDropModule,
    MatMomentDateModule,
    AppMaterialModule,
    ReactiveFormsModule,
    NgLetModule,
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class TimeTrialModule { }
