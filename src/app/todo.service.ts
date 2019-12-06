import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Todo} from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  findTodos(): Observable<Todo[]> {

    return this.http.get('/api/todo')
      .pipe(
        map(res => res["payload"])
      );
  }

  updateTodo(id: string, body: string) {
    return this.http.post(`/api/todo/${id}`, {
      params: new HttpParams()
        .set('body', body)
    }).pipe(
      map(res => console.log('returning res on post data == ', res))
    );
  }

  deleteTodo(id: string) {
    return this.http.delete(`/api/todo/${id}`)
      .pipe(
      map(res => console.log('returning res on DELETE  == ', res))
    );
  }

}
