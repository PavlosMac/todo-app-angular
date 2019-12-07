import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Todo, TodoEntry} from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }


  updateTodo(todo: Todo, id: number) {
    return this.http.put(`/api/todos/${id}/`, todo , this.HTTP_OPTIONS).pipe(
      map(res => res)
    );
  }
  //
  // deleteTodo(id: string) {
  //   return this.http.delete(`http://localhost:8000/api/todo/${id}`)
  //     .pipe(
  //     map(res => console.log('returning res on DELETE  == ', res))
  //   );
  // }

  createTodo( entry: object ) {
    return this.http.post(`api/todos/`, entry, this.HTTP_OPTIONS)
      .pipe(
        map(res => res)
      );
  }

}
