import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import {AdminRoutingModule} from './admin-routing.module';
import {OrganizationModule} from '../organization/organization.module';
import {AppMaterialModule} from '../material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GroupModule} from '../group/group.module';
import {ShellModule} from '../shell/shell.module';
import { AdminGroupComponent } from './components/admin-group/admin-group.component';
import {RowerModule} from '../rower/rower.module';
import { AdminUserComponent } from './components/admin-user/admin-user.component';



@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminGroupComponent,
    AdminUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    OrganizationModule,
    GroupModule,
    ShellModule,
    RowerModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class AdminModule { }
