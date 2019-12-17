import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Todo, TodoEntry} from '../models/todo.model';
import {Constants} from '../utils/constants';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  API_URL = Constants.PROD_URL;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/todos/`)
      .pipe(
        map((data: Todo[]) => {
          return data.map(todo => {
            return new TodoEntry().deserialize(todo);
          });
        })
      );
  }

  updateTodo(todo: Todo, id: number): Observable<any> {
    return this.http.put(`${this.API_URL}/api/todos/${id}/`, todo)
      .pipe(
        catchError((err) => throwError(err)),
        map(res => {
            return new TodoEntry().deserialize(res)
          }
        ));
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/api/todos/${id}/`)
      .pipe(
        catchError((err) => throwError(err)),
        map(res => res)
      );
  }

  createTodo(entry: object): Observable<any> {
    return this.http.post(`${this.API_URL}/api/todos/`, entry)
      .pipe(
        catchError((err) => throwError(err)),
        map(res => res)
      );
  }
}
