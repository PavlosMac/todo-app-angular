import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    ListTodoComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    NoopAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  entryComponents: [
    DialogBoxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
