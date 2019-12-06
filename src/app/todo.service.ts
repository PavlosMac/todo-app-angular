import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Todo} from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) {}

  findTodos():  Observable<Todo[]> {

    return this.http.get('/api/todo' )
      .pipe(
      map(res =>  res["payload"])
    );
  }
}
