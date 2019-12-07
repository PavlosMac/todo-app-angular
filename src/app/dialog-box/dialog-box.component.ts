import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit{

  dialogueTitle: string;
  content: string;
  newTodoBody: string;
  newPriority: string;
  newTodoTitle: string;

  displayOnly = false;
  editMode = false;
  create = false;

  form: FormGroup;

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<DialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) data: {title: string; content?: string, display?: boolean, createMode?: boolean, editMode?: boolean}) {

    this.dialogueTitle = data.title;
    this.content = data.content;
    this.displayOnly = data.display;
    this.editMode = data.editMode;
    this.create = data.createMode;
  }

  ngOnInit() {
    if(this.create) {
      this.form = this.fb.group({
        'title': new FormControl('', [Validators.required]),
        'description': new FormControl('', [Validators.required]),
        'priority_level': new FormControl('', [Validators.required])
      });
    }
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
    if(!this.form.valid) {
      return this.form.markAllAsTouched();
    }
    this.dialogRef.close({
      create: true,
      entry: this.form.value
    });
  }

  get f() { return this.form.controls; }

  deleteTodo() {
    this.dialogRef.close({delete: true});
  }
}
