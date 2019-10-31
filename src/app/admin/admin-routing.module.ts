import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import {AdminGroupComponent} from './components/admin-group/admin-group.component';
import {AdminUserComponent} from './components/admin-user/admin-user.component';

const routes: Routes = [
  { path: '', component: AdminHomeComponent },
  { path: 'groups/:id', component: AdminGroupComponent },
  { path: 'users/:id', component: AdminUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
