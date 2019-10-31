import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppMaterialModule} from '../material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RentalNgrxModule} from './rental-ngrx.module';
import {RentalListComponent} from './components/rental-list/rental-list.component';
import {RentalCreateComponent} from './components/rental-create/rental-create.component';
import {RentalRoutingModule} from './rental-routing.module';
import {NgLetModule} from '@ngrx-utils/store';
import {ShellModule} from '../shell/shell.module';
import {RentalEditComponent} from './components/rental-edit/rental-edit.component';
import {RentalRowerListComponent} from './components/rental-rower-list/rental-rower-list.component';
import {RowerModule} from '../rower/rower.module';



@NgModule({
  declarations: [
    RentalListComponent,
    RentalCreateComponent,
    RentalEditComponent,
    RentalRowerListComponent
  ],
  exports: [
    RentalListComponent,
    RentalCreateComponent,
    RentalEditComponent,
    RentalRowerListComponent
  ],
  imports: [
    CommonModule,
    ShellModule,
    RowerModule,
    AppMaterialModule,
    FlexLayoutModule,
    NgLetModule,
    RentalNgrxModule,
    RentalRoutingModule
  ]
})
export class RentalModule { }
