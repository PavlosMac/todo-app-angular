import {Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {Todo} from '../../models/todo.model';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {catchError, map, take, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;

  expandedElement: Todo | null;
  displayedColumns = ["title", "priority", "dateUpdated"];

  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.pipe(
      take(1),
    ).subscribe(res => {
      if (res['data'] && res['data'].length === 0) {
        setTimeout(() => this.openCreateDialog(), 1000);
      }
      this.dataSource = new MatTableDataSource(res['data']);
      this.sortByPriorityLevel();
    });
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
    }
    dialogConfig['width'] = '300px';

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
              .pipe(
                catchError(() => this.handleError())
              )
              .subscribe(
                (todo) => {
                  this.findAndUpdateDataTable(todo as Todo, 'update');
                });
          }
          if (res.delete) {
            this.todoService.deleteTodo(entry.id)
              .pipe(
                catchError(() => this.handleError())
              )
              .subscribe(
                () => {
                  this.findAndUpdateDataTable(entry, 'delete');
                });
          }
          if (res.create) {
            this.todoService.createTodo(res.entry)
              .pipe(
                catchError(() => this.handleError())
              )
              .subscribe(
                entry => {
                  this.dataSource.data.push(entry as Todo);
                  this.resetTable();
                });
          }
        })
      ).subscribe();
  }

  handleError(): Observable<never> {
    this.router.navigate(['/not-found']);
    return EMPTY;
  }

  findAndUpdateDataTable(entry, action) {
    this.dataSource.data.forEach((element, index) => {
      if (element.id === entry.id) {
        if (action === 'update') {
          this.dataSource.data[index] = entry;
        }
        if (action === 'delete') {
          this.dataSource.data.splice(index, 1);
        }
      }
    });
    this.resetTable();
  }

  resetTable() {
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.sortByPriorityLevel();
  }

  openCreateDialog() {
    this.openDialog('create', null);
  }

  sortByPriorityLevel() {
    console.log('called')
    return this.dataSource.data.sort((a, b) => {
      return a.priority_level > b.priority_level ? 1 : -1;
    });
  }
}
