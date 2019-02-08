import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTrialListComponent } from './time-trial-list/time-trial-list.component';
import { TimeTrialEditComponent } from './time-trial-edit/time-trial-edit.component';
import { TimeTrialCreateComponent } from './time-trial-create/time-trial-create.component';
import { TimeTrialComponent } from './time-trial/time-trial.component';
import {TimeTrialRoutingModule} from './time-trial-routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TimeTrialNgrxModule} from './time-trial-ngrx.module';
import {NgLetModule} from '@ngrx-utils/store';

@NgModule({
  declarations: [
    TimeTrialListComponent,
    TimeTrialEditComponent,
    TimeTrialCreateComponent,
    TimeTrialComponent
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
    NgLetModule
  ]
})
export class TimeTrialModule { }
