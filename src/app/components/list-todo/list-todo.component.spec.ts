import {ListTodoComponent} from './list-todo.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
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


describe('TodoListComponent', () => {

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
    data:  { data: [ {id: 133, title: 'some title', description: 'dsdsd', date_created:'2019-12-13T11:12:09.861699Z', date_updated:'2019-12-17T19:49:09.861699Z', priority_level: 'Low'} as Todo] }
  });


  beforeEach(() => {
    spectator = createComponent();
  });

  it('should initialise', () => {

    expect(spectator.component).toBeTruthy();
    expect(spectator.component.expandedElement).toBe(undefined);
  });

  it('should pass one todo from activated route', () => {
    spectator = createComponent();
    expect(spectator.component.dataSource.data[0]).toHaveLength(1);
    expect(spectator.component.dataSource.data[0]).toHaveId(133);
  });
});
