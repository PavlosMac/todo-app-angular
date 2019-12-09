import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Todo, TodoEntry} from '../models/todo.model';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosResolverService implements Resolve<Todo[]>  {

  constructor(private http: HttpClient, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    console.log('resolver called');
    return this.http.get('/api/todos/')
      .pipe(
        catchError(() => {
          console.log('catch error')
          return this.handleError();
        }),
        map( (res: Todo[]) => {
          if (res) {
            return res.map(( t ) => {
              return new TodoEntry().deserialize( t );
            }
            );
          } else {
            return this.handleError();
          }
        })
      );
  }


  handleError(): Observable<boolean[]> {
    this.router.navigate(['/not-found']);
    return of([false]);
  }
}
