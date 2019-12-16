import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Todo} from '../models/todo.model';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {TodoService} from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class TodosResolverService implements Resolve<Todo[]> {

  constructor(private http: HttpClient, private router: Router, private todoService: TodoService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return this.todoService.getTodos()
      .pipe(
        catchError(() => {
          return this.handleError()
        }));
  }

  handleError(): Observable<never> {
    this.router.navigate(['/not-found']);
    return EMPTY;
  }
}
