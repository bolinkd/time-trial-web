import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {ObserversModule} from '@angular/cdk/observers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    ObserversModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
