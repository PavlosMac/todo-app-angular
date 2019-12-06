import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../todo.service';
import {MatDialog, MatDialogConfig, MatPaginator, MatTable} from '@angular/material';
import {Todo} from '../todo.model';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit{

  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatTable, { static: true }) table: MatTable<any>;


  public elementData = [
    {id: 29, title: "new todo 1", body: 'Hydrogen fdfdfdsfs fefefeifaeff faefeafeafaef', priority: "3", completed: false},
    {id: 12, title: "new todo 2", body: 'Helium', priority: "9", completed: true},
    {id: 1, title: "new todo 3", body: 'Lithium', priority: "2", completed: false},
    {id: 7, title: "new todo 4", body: 'Beryllium', priority: "1", completed: true},
    {id: 6, title: "new todo 5", body: 'Boron', priority: "0", completed: false},
    {id: 4, title: "new todo 6", body: 'Carbon', priority: "10", completed: false},
    {id: 3, title: "new todo 7", body: 'Nitrogen', priority: "4", completed: true}
  ];

  dataSource = this.elementData;

  expandedElement: Todo | null;
  displayedColumns = ["title", "created", "dateUpdated", "completed"];

  constructor(private todoService: TodoService, public dialog: MatDialog) { }


  ngOnInit() {
    this.todoService.findTodos()
      .subscribe(
        res => {
          this.dataSource = res as Todo[];
        }
      );
  }

  onRowClicked(row) {
    console.log('do something with row ', row);
    this.openDialog( 'display', row);
  }

  openDialog( mode: string, row?: Todo | null) {
    const dialogConfig = new MatDialogConfig();
    let entry: Todo | null;

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if( mode !== 'create') {
      entry = this.dataSource.find( el => {
        return el.id === row.id;
      });
    }

    dialogConfig.data = {
      display: mode === 'display',
      editMode: mode === 'edit',
      createMode: mode === 'create',
      title: row ? row.title : null,
      content: entry ? `${entry.body}` : null
    };

    if(mode === 'create') {
      dialogConfig['height'] = '400px';
      dialogConfig['width'] = '300px';
    }

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        map( res => {
          if (res.edit) {
            return this.openDialog( 'edit', row)
          }
          if (res.update) {
            this.todoService.updateTodo( row.id.toString(), res.newTodo )
          }
          if (res.delete) {
            this.todoService.deleteTodo( row.id.toString() )
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
