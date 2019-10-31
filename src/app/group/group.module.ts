import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppMaterialModule} from '../material';
import {NgLetModule} from '@ngrx-utils/store';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GroupListComponent} from './components/group-list/group-list.component';
import {GroupEditComponent} from './components/group-edit/group-edit.component';
import {GroupCreateComponent} from './components/group-create/group-create.component';
import {GroupNgrxModule} from './group-ngrx.module';



@NgModule({
  declarations: [
    GroupListComponent,
    GroupEditComponent,
    GroupCreateComponent
  ],
  exports: [
    GroupListComponent,
    GroupEditComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    NgLetModule,
    GroupNgrxModule,
    FlexLayoutModule
  ]
})
export class GroupModule { }
