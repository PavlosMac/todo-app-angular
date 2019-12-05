import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.sass']
})
export class ListTodoComponent implements OnInit {


  dataSource = ""

  displayedColumns = ["title", "body", "created", "updated", "completed"];

  constructor() { }

  ngOnInit() {
  }

}
