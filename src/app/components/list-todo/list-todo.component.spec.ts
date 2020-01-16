import {ListTodoComponent} from './list-todo.component';
import {
  MAT_DIALOG_DATA,
  MatButtonModule, MatCardModule,
  MatDialogModule, MatDialogRef, MatFormFieldModule, MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule, MatRadioModule,
  MatTableModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DateTimeFormatPipe} from '../../pipes/date-time-format.pipe';
import {LoaderComponent} from '../loader/loader.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Todo} from '../../models/todo.model';
import {createRoutingFactory} from '@ngneat/spectator/jest';
import {SpectatorRouting} from '@ngneat/spectator';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {createTestComponentFactory, Spectator} from '@netbasal/spectator';
import {BrowserModule, By} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {APP_BASE_HREF} from '@angular/common';
import {SpectatorElement} from '@netbasal/spectator/lib/internals';


describe('Handling of button events', () => {

  Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
      getPropertyValue: (prop) => {
        return '';
      }
    })
  });
  Object.defineProperty(window, 'matchMedia', {
    value: () => ({
      matches: false,
      addListener: () => {
      },
      removeListener: () => {
      }
    })
  });

  let spectator: Spectator<ListTodoComponent>;

  const createComponent = createTestComponentFactory({
    entryComponents: [DialogBoxComponent],
    declarations: [
      DialogBoxComponent,
      DateTimeFormatPipe,
      PageNotFoundComponent,
      LoaderComponent
    ],
    providers: [
      {provide: MAT_DIALOG_DATA, useValue: {}},
      {provide: APP_BASE_HREF, useValue: '/'},
      {provide: MatDialogRef, useValue: {open: () => of(true)}}
    ],
    imports: [
      RouterTestingModule,
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
    component: ListTodoComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should initialise', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should be defined and have text ADD TODO', () => {
    expect(spectator.query('button')).toBeDefined();
    expect(spectator.query('button')).toHaveExactText('ADD TODO');
  });

  it('should call openCreateDialog if clicked', () => {
    const button = <SpectatorElement>spectator.query('button');

    spyOn(spectator.component, 'openCreateDialog').and.callThrough();
    spectator.click(button);

    expect(spectator.component.openCreateDialog).toHaveBeenCalledTimes(1);
  });

  it('openCreateDialog should call openDialog if button is clicked', () => {
    const button = <SpectatorElement>spectator.query('button');

    spyOn(spectator.component, 'openDialog').and.callThrough();
    spectator.click(button);

    expect(spectator.component.openDialog).toHaveBeenCalledWith('create', null);
  });
});

describe('TodoListComponent with todo data provided from route', () => {

  Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
      getPropertyValue: (prop) => {
        return '';
      }
    })
  });
  Object.defineProperty(window, 'matchMedia', {
    value: () => ({
      matches: false,
      addListener: () => {
      },
      removeListener: () => {
      }
    })
  });

  let spectator: SpectatorRouting<ListTodoComponent>;

  const createComponent = createRoutingFactory({
    declarations: [
      DateTimeFormatPipe,
      LoaderComponent
    ],
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      MatPaginatorModule,
      FlexLayoutModule,
      MatProgressSpinnerModule,
      MatTableModule,
      MatDialogModule,
      MatButtonModule,
      MatPaginatorModule],
    component: ListTodoComponent,
    data: {
      data: [{
        id: 133,
        title: 'some title',
        description: 'dsdsd',
        date_created: '2019-12-13T11:12:09.861699Z',
        date_updated: '2019-12-17T19:49:09.861699Z',
        priority_level: 'Low'
      } as Todo]
    }
  });


  beforeEach(() => {
    spectator = createComponent();
  });

  it('should initialise', () => {

    expect(spectator.component).toBeTruthy();
    expect(spectator.component.expandedElement).toBe(undefined);
  });

  it('should pass one todo from activated route', () => {
    expect(spectator.component.dataSource.data[0]).toHaveLength(1);
    expect(spectator.component.dataSource.data[0]).toHaveId(133);
  });

  it('should call sortByPriorityLevel', () => {
    spectator.fixture.whenStable().then(() => {
      expect(spectator.component.sortByPriorityLevel).toHaveBeenCalled();
      expect(spectator.component.sortByPriorityLevel).toHaveBeenCalledTimes(1);
    });
  });

  it('should instantiate MatDataSource', () => {
    spectator.fixture.whenStable().then(() =>
      expect(spectator.component.dataSource).toBeDefined()
    )
  });

});

describe('TodoListComponent without todo data provided from route', () => {

  let spectator: SpectatorRouting<ListTodoComponent>;

  const createComponent = createRoutingFactory({
    declarations: [
      DateTimeFormatPipe,
      LoaderComponent
    ],
    componentProviders: [
      {provide: MAT_DIALOG_DATA, useValue: {}},
      {provide: MatDialogRef, useValue: {open: () => of(true)}}
    ],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      RouterTestingModule,
      MatPaginatorModule,
      FlexLayoutModule,
      MatProgressSpinnerModule,
      MatTableModule,
      MatDialogModule,
      MatButtonModule,
      MatPaginatorModule,
      MatRadioModule,
      MatFormFieldModule],
    component: ListTodoComponent,
    data: {data: []}
  });


  beforeEach(() => {
    spectator = createComponent();
  });

  it('should initialise', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should pass empty array from route', () => {
    expect(spectator.component.dataSource.data[0]).toHaveLength(0);
  });

  it('should not instantiate MatDataSource', () => {
    spectator.fixture.whenStable().then(() =>
      expect(spectator.component.dataSource).toBeUndefined()
    )
  });

  it('openCreateDialog should be called when no route data', () => {
    spectator.fixture.whenStable().then(() => {
      expect(spectator.component.sortByPriorityLevel).toHaveBeenCalledTimes(0);
      expect(spectator.component.openCreateDialog).toHaveBeenCalled();
      expect(spectator.component.dialog).toHaveBeenCalled();
    });
  });
});
