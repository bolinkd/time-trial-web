import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppMaterialModule} from '../material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RowerNgrxModule} from './rower-ngrx.module';
import {RowerListComponent} from './components/rower-list/rower-list.component';
import {RowerEditComponent} from './components/rower-edit/rower-edit.component';
import {RowerCreateComponent} from './components/rower-create/rower-create.component';
import {RowerSelectComponent} from './components/rower-select/rower-select.component';



@NgModule({
  declarations: [
    RowerListComponent,
    RowerEditComponent,
    RowerCreateComponent,
    RowerSelectComponent
  ],
  exports: [
    RowerListComponent,
    RowerEditComponent,
    RowerCreateComponent,
    RowerSelectComponent
  ],
  entryComponents: [
    RowerSelectComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    RowerNgrxModule
  ]
})
export class RowerModule { }
