import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTodoComponent} from './list-todo/list-todo.component';
import {TodosResolverService} from './services/todosresolver.service';

const routes: Routes = [

  {
    path:"",
    component: ListTodoComponent,
    resolve: {data: TodosResolverService}

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
