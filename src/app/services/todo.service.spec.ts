import {createHTTPFactory} from '@netbasal/spectator/jest';
import {TodoService} from './todo.service';
import {HTTPMethod, SpectatorHTTP} from '@netbasal/spectator';
import {Todo} from '../models/todo.model';

describe('TodoService', () => {

  let spectator: SpectatorHTTP<TodoService>;
  const createHttp = createHTTPFactory(TodoService);

  beforeEach(() => spectator = createHttp());

  it('exists', () => {
    expect(spectator).toBeDefined();
  });

  it('can get todos from the server', () => {
    spectator.dataService.getTodos().subscribe();

    spectator.expectOne('/api/todos/', HTTPMethod.GET);
  });

  it('can update one todo on the server', () => {
    const todo = new Todo(133, '','','','','');
    spectator.dataService.updateTodo(todo, 133).subscribe();
    spectator.expectOne('/api/todos/133/', HTTPMethod.PUT);
  });

  it('can create new todo on the server', () => {
    const todo = new Todo(133, '','','','','');
    spectator.dataService.createTodo({}).subscribe();
    spectator.expectOne('/api/todos/', HTTPMethod.POST);
  });

  it('can delete a todo on the server', () => {
    spectator.dataService.deleteTodo(133).subscribe();
    spectator.expectOne('/api/todos/133/', HTTPMethod.DELETE);
  });
});
