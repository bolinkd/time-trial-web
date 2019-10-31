import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RentalListComponent} from './components/rental-list/rental-list.component';
import {RentalCreateComponent} from './components/rental-create/rental-create.component';
import {RentalEditComponent} from './components/rental-edit/rental-edit.component';

const routes: Routes = [
  { path: '', component: RentalListComponent },
  { path: 'new', component: RentalCreateComponent },
  { path: ':id', component: RentalEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalRoutingModule { }
