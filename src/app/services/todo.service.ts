import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Todo, TodoEntry} from '../models/todo.model';
import {Constants} from '../utils/constants';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  API_URL = Constants.PROD_URL;

  constructor(private http: HttpClient) {
  }

  updateTodo(todo: Todo, id: number) {
    return this.http.put(`${this.API_URL}/api/todos/${id}/`, todo, this.HTTP_OPTIONS)
      .pipe(
        catchError((err) => throwError(err)),
        map(res => {
            return new TodoEntry().deserialize(res)
          }
        ));
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.API_URL}/api/todos/${id}/`)
      .pipe(
        catchError((err) => throwError(err)),
        map(res => res)
      );
  }

  createTodo(entry: object) {
    return this.http.post(`${this.API_URL}/api/todos/`, entry, this.HTTP_OPTIONS)
      .pipe(
        catchError((err) => throwError(err)),
        map(res => res)
      );
  }
}
