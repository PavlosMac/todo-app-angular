import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../services/todo.service';
import {MatDialog, MatDialogConfig, MatPaginator, MatTable} from '@angular/material';
import {Todo} from '../models/todo.model';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {

  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  dataSource: Todo[];

  expandedElement: Todo | null;
  displayedColumns = ["title", "created", "dateUpdated", "completed"];

  constructor(private route: ActivatedRoute, private todoService: TodoService, public dialog: MatDialog) {
    this.route.data.pipe(
      take(1),
      map(res => res)
    ).subscribe(res => {
      this.dataSource = res['data']
    });
  }


  ngOnInit() {
  }

  onRowClicked(row) {
    console.log('do something with row ', row);
    this.openDialog('display', row);
  }

  openDialog(mode: string, row?: Todo | null) {
    const dialogConfig = new MatDialogConfig();
    let entry: Todo | null;

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if (mode !== 'create') {
      entry = this.dataSource.find(el => {
        return el.id === row.id;
      });
    }

    dialogConfig.data = {
      display: mode === 'display',
      editMode: mode === 'edit',
      createMode: mode === 'create',
      title: row ? row.title : null,
      content: entry ? `${entry.description}` : null
    };

    if (mode === 'create') {
      dialogConfig['height'] = '400px';
      dialogConfig['width'] = '300px';
    }

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        map(res => {
          if (res.edit) {
            return this.openDialog('edit', row)
          }
          if (res.editTodo) {
            // this.todoService.updateTodo( row.id.toString(), res.newTodo )
          }
          if (res.delete) {
            // this.todoService.deleteTodo( row.id.toString() )
          }
          if (res.create) {
            this.todoService.createTodo(res.entry)
              .subscribe(
                entry => {
                  this.dataSource.push(entry as Todo);
                  this.table.renderRows();
                }
              )
          }
        })
      ).subscribe();

  }

  openCreateDialog() {
    this.openDialog('create', null)
  }

  // addRowData(row_obj){
  //   const d = new Date();
  //   this.dataSource.data.push({
  //     id: d.getTime(),
  //     name: row_obj.name
  //   });
  //   this.table.renderRows();
  // }
  //
  // updateRowData(row_obj){
  //   this.dataSource.data = this.dataSource.data.filter((value, key) => {
  //     if(value.id == row_obj.id){
  //       value.name = row_obj.name;
  //     }
  //     return true;
  //   });
  // }
  //
  // deleteRowData(row_obj){
  //   this.dataSource.data = this.dataSource.data.filter((value, key) => {
  //     return value.id != row_obj.id;
  //   });
  // }


}
