import {Component, Inject, NgZone, OnInit, Optional, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Todo, TodoEntry} from '../models/todo.model';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  dialogueTitle: string;
  content: string;
  newTodoBody: string;
  newPriority: string;
  newTodoTitle: string;

  displayOnly = false;
  editMode = false;
  create = false;

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor(private dialogRef: MatDialogRef<DialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) data: {title: string; content?: string, display?: boolean, createMode?: boolean, editMode?: boolean}) {

    this.dialogueTitle = data.title;
    this.content = data.content;
    this.displayOnly = data.display;
    this.editMode = data.editMode;
    this.create = data.createMode;
  }

  close() {
    this.dialogRef.close();
  }

  update() {
    this.dialogRef.close({edit: true});
  }

  updateTodo() {
    this.dialogRef.close({editTodo: this.newTodoBody});
  }

  createTodo() {
    this.dialogRef.close({
      create: true,
      entry: {title: this.newTodoTitle, description: this.newTodoBody, priority_level: this.newPriority}
    });
  }

  deleteTodo() {
    this.dialogRef.close({delete: true});
  }
}
