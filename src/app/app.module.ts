import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule,
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule,
  MatTableModule
} from '@angular/material';
import { ListTodoComponent } from './components/list-todo/list-todo.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TodosResolverService} from './services/todosresolver.service';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import {LoaderService} from './services/loader.service';
import {LoaderInterceptor} from './interceptors/loader.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {PageNotFoundResolver} from './components/page-not-found/page-not-found.resolver';

@NgModule({
  declarations: [
    AppComponent,
    ListTodoComponent,
    DialogBoxComponent,
    DateTimeFormatPipe,
    LoaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexLayoutModule,
    NoopAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatPaginatorModule
  ],
  providers: [
    TodosResolverService,
    PageNotFoundResolver,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  entryComponents: [
    DialogBoxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
