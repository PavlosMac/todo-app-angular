import {Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../services/todo.service';
import {MatDialog, MatDialogConfig, MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
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

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  dataSource: MatTableDataSource<any>;

  expandedElement: Todo | null;
  displayedColumns = ["title", "created", "dateUpdated"];

  constructor(private route: ActivatedRoute, private todoService: TodoService, public dialog: MatDialog) {
    this.route.data.pipe(
      take(1),
      map(res => res)
    ).subscribe(res => {
      this.dataSource = new MatTableDataSource(res['data']);
      this.sortByPriorityLevel();
    });
  }

  ngOnInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  onRowClicked(row) {
    this.openDialog('display', row);
  }

  openDialog(mode: string, row?: Todo | null) {
    const dialogConfig = new MatDialogConfig();
    let entry: Todo | null;

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if (mode !== 'create') {
      entry = this.dataSource.data.find(el => {
        return el.id === row.id;
      });
    }

    dialogConfig.data = {
      display: mode === 'display',
      editMode: mode === 'edit',
      createMode: mode === 'create',
      entryToEdit: entry ? entry : null
    };

    if (mode === 'create' || mode == 'edit') {
      dialogConfig['height'] = '400px';
      dialogConfig['width'] = '300px';
    }

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        map(res => {
          if (!res)
            return;
          if (res.edit) {
            return this.openDialog('edit', row)
          }
          if (res.editCurrentEntry) {
            this.todoService.updateTodo(res.entry, entry.id)
              .subscribe(
                (entry: Todo) => {
                  this.findAndUpdateDataTable(entry, 'update');
                })
          }
          if (res.delete) {
            this.todoService.deleteTodo(entry.id)
              .subscribe(
                () => {
                  this.findAndUpdateDataTable(entry, 'delete');
                }
              )
          }
          if (res.create) {
            this.todoService.createTodo(res.entry)
              .subscribe(
                entry => {
                  this.dataSource.data.push(entry as Todo);
                  this.sortByPriorityLevel();
                  this.table.renderRows();
                }
              )
          }
        })
      ).subscribe();

  }

  findAndUpdateDataTable(entry, action) {
    const idx = this.dataSource.data.findIndex(item => item.id === entry.id);
    action === 'update' ? this.dataSource.data.splice(idx, 1, entry)
      : this.dataSource.data.splice(idx, 1);
    this.sortByPriorityLevel();
    this.table.renderRows();
  }

  openCreateDialog() {
    this.openDialog('create', null);
  }

  sortByPriorityLevel() {
    return this.dataSource.data.sort((a, b) => {
      return a.priority_level > b.priority_level ? 1 : -1;
    })
  }

}
