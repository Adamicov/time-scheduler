import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@models/category';
import { Todo } from '@models/todo';

export interface TodoDialogData {
  todo?: Todo;
  categories?: Category[] | undefined;
}


@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss'],
})
export class TodoDialogComponent implements OnInit {
  todoForm: FormGroup;
  selectedCategory: Category | undefined;
  defaultCategories: Category[] = [
    { name: 'Work', color: '#6f3e19' },
    { name: 'Sport', color: '#f8d40b' },
  ];
  submitText: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoDialogData
  ) {}

  ngOnInit(): void {
    this.submitText = this.data.todo ? 'Update' : 'Save';
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: [Validators.required],
      deadline: [Validators.required],
    });
  }

  submit(): void {
    let todo: Todo = this.todoForm.value;
    todo = {...todo, id: todo.title + '-' + todo.category}
    console.log(todo);
    this.dialogRef.close(todo);
  }
}
