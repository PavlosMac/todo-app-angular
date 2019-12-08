import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTodoComponent} from './components/list-todo/list-todo.component';
import {TodosResolverService} from './services/todosresolver.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PageNotFoundResolver} from './components/page-not-found/page-not-found.resolver';

const routes: Routes = [

  {
    path: "",
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    component: ListTodoComponent,
    resolve: {data: TodosResolverService}

  },
  {
    path: '**',
    component: PageNotFoundComponent,
    resolve: {data: PageNotFoundResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
