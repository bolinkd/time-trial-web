import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppMaterialModule} from '../material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ShellListComponent} from './components/shell-list/shell-list.component';
import {ShellCreateComponent} from './components/shell-create/shell-create.component';
import {ShellEditComponent} from './components/shell-edit/shell-edit.component';
import {ShellNgrxModule} from './shell-ngrx.module';



@NgModule({
  declarations: [
    ShellListComponent,
    ShellCreateComponent,
    ShellEditComponent
  ],
  exports: [
    ShellListComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    ShellNgrxModule
  ]
})
export class ShellModule { }
