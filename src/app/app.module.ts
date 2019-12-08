import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule,
  MatInputModule, MatProgressSpinnerModule, MatRadioModule,
  MatTableModule
} from '@angular/material';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TodosResolverService} from './services/todosresolver.service';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { LoaderComponent } from './loader/loader.component';
import {LoaderService} from './services/loader.service';
import {LoaderInterceptor} from './interceptors/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListTodoComponent,
    DialogBoxComponent,
    DateTimeFormatPipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NoopAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  providers: [TodosResolverService, LoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  entryComponents: [
    DialogBoxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
