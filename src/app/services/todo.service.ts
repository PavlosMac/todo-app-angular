import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Todo, TodoEntry} from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }


  updateTodo(todo: Todo, id: number) {
    return this.http.put(`/api/todos/${id}/`, todo, this.HTTP_OPTIONS)
      .pipe(
        map(res => {
            return new TodoEntry().deserialize(res)
          }
        ));
  }

  deleteTodo(id: number) {
    return this.http.delete(`/api/todos/${id}/`)
      .pipe(
        map(res => res)
      );
  }

  createTodo(entry: object) {
    return this.http.post(`api/todos/`, entry, this.HTTP_OPTIONS)
      .pipe(
        map(res => res)
      );
  }

}
