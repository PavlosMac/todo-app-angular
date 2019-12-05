import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTodoComponent} from './list-todo/list-todo.component';

const routes: Routes = [

  {
    path:"",
    component: ListTodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
