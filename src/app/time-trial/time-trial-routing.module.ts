import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimeTrialListComponent} from './time-trial-list/time-trial-list.component';
import {TimeTrialComponent} from './time-trial/time-trial.component';
import {TimeTrialCreateComponent} from './time-trial-create/time-trial-create.component';
import {TimeTrialEditComponent} from './time-trial-edit/time-trial-edit.component';

const routes: Routes = [
  { path: '', component: TimeTrialListComponent },
  { path: 'new', component: TimeTrialCreateComponent },
  { path: ':id', component: TimeTrialComponent },
  { path: ':id/edit', component: TimeTrialEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTrialRoutingModule { }
