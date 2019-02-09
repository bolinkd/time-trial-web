import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTrialListComponent } from './time-trial-list/time-trial-list.component';
import { TimeTrialEditComponent } from './time-trial-edit/time-trial-edit.component';
import { TimeTrialCreateComponent } from './time-trial-create/time-trial-create.component';
import { TimeTrialComponent } from './time-trial/time-trial.component';
import {TimeTrialRoutingModule} from './time-trial-routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatSelectModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TimeTrialNgrxModule} from './time-trial-ngrx.module';
import {NgLetModule} from '@ngrx-utils/store';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {TimeTrialFormComponent} from './time-trial-form/time-trial-form.component';

@NgModule({
  declarations: [
    TimeTrialListComponent,
    TimeTrialEditComponent,
    TimeTrialCreateComponent,
    TimeTrialComponent,
    TimeTrialFormComponent,
  ],
  imports: [
    CommonModule,
    TimeTrialRoutingModule,
    TimeTrialNgrxModule,
    FlexLayoutModule,
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    NgLetModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class TimeTrialModule { }
