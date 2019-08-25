import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimeTrialListComponent} from './components/time-trial-list/time-trial-list.component';
import {TimeTrialComponent} from './components/time-trial/time-trial.component';
import {TimeTrialCreateComponent} from './components/time-trial-create/time-trial-create.component';
import {TimeTrialEditComponent} from './components/time-trial-edit/time-trial-edit.component';
import {TimeTrialBoatsComponent} from './components/time-trial-boats/time-trial-boats.component';
import {TimeTrialBoatsEditComponent} from './components/time-trial-boats-edit/time-trial-boats-edit.component';
import {TimeTrialBoatsCreateComponent} from './components/time-trial-boats-create/time-trial-boats-create.component';

const routes: Routes = [
  { path: '', component: TimeTrialListComponent },
  { path: 'new', component: TimeTrialCreateComponent },
  { path: ':id', component: TimeTrialComponent },
  { path: ':id/edit', component: TimeTrialEditComponent },
  { path: ':id/boats', component: TimeTrialBoatsComponent },
  { path: ':id/boats/new', component: TimeTrialBoatsCreateComponent },
  { path: ':id/boats/:boat_id', component: TimeTrialBoatsEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTrialRoutingModule { }
