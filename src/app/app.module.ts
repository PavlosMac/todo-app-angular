import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule,
  MatInputModule, MatRadioModule,
  MatTableModule
} from '@angular/material';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TodosResolverService} from './services/todosresolver.service';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListTodoComponent,
    DialogBoxComponent,
    DateTimeFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NoopAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  providers: [TodosResolverService],
  entryComponents: [
    DialogBoxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
