import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../../models/todo.model';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit{

  entry: Todo | null;

  displayOnly = false;
  editMode = false;
  create = false;

  form: FormGroup;

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<DialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) data:
                {
                  title: string; content?: string,
                  display?: boolean,
                  createMode?: boolean,
                  editMode?: boolean,
                  entryToEdit: Todo
                }) {
    this.displayOnly = data.display;
    this.entry = data.entryToEdit;
    this.displayOnly = data.display;
    this.editMode = data.editMode;
    this.create = data.createMode;
  }

  ngOnInit() {
    if(this.create || this.editMode) {
      let title = this.editMode ? this.entry.title : '';
      let description = this.editMode ? this.entry.description : '';
      let priority = this.editMode ? this.entry.priority_level : 'Low';
      this.form = this.fb.group({
        'title': new FormControl(title, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
        'description': new FormControl(description, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
        'priority_level': new FormControl(priority, [Validators.required])
      });
    }

    this.form.valueChanges.subscribe( val => console.log(val))
  }

  close() {
    this.dialogRef.close();
  }

  update() {
    this.dialogRef.close({edit: true});
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

  editTodo() {
    if(!this.form.valid) {
      return this.form.markAllAsTouched();
    }
    this.dialogRef.close({
      editCurrentEntry: true,
      entry: this.form.value
    });
  }

  get f() { return this.form.controls; }

  deleteTodo() {
    this.dialogRef.close({delete: true});
  }
}
