import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Todo, TodoEntry} from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  // findTodos(): Observable<any> {
  //   return this.http.get('http://localhost:8000/api/todo')
  //     .pipe(
  //       map(res => {
  //         console.log("getting all todods === ", res)
  //         return of([])
  //       })
  //     );
  // }

  // updateTodo(id: string, body: string) {
  //   return this.http.post(`http://localhost:8000/api/todo/${id}`, {
  //     params: new HttpParams()
  //       .set('body', body)
  //   }).pipe(
  //     map(res => console.log('returning res on post data == ', res))
  //   );
  // }
  //
  // deleteTodo(id: string) {
  //   return this.http.delete(`http://localhost:8000/api/todo/${id}`)
  //     .pipe(
  //     map(res => console.log('returning res on DELETE  == ', res))
  //   );
  // }

  createTodo( entry: object ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(`api/todos/`, entry, httpOptions)
      .pipe(
        map(res => res)
      );
  }

}
