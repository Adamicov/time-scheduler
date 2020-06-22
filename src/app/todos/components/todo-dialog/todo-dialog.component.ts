import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@models/category';
import { Todo } from '@models/todo';
import { compareCategoriesFn } from '@shared/compareUtils';
import { CrudEnum } from '@models/crud-enum';

export interface TodoDialogData {
  todo?: Todo;
  categories?: Category[] | undefined;
}

export interface TodoDialogResponse {
  todo: Todo;
  action: CrudEnum;
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss'],
})
export class TodoDialogComponent implements OnInit {
  compareCategoriesFn = compareCategoriesFn;

  todo: Todo | undefined;
  todoForm: FormGroup;
  selectedCategory: Category | undefined;
  categories: Category[];
  action: CrudEnum;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoDialogData
  ) {}

  ngOnInit(): void {
    this.todo = this.data.todo;
    this.categories = this.data.categories;
    this.action = this.todo ? CrudEnum.Update : CrudEnum.Save;
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [],
      category: ['', Validators.required],
      deadline: ['', Validators.required],
    });
    if (this.todo) {
      this.todoForm.patchValue({ ...this.todo });
      this.selectedCategory = this.todo.category;
    }
  }

  submit(): void {
    if (this.todoForm.invalid) {
      return;
    }
    const todo: Todo = { ...this.todo, ...this.todoForm.value };
    const dialogResponse: TodoDialogResponse = { todo, action: this.action };
    this.dialogRef.close(dialogResponse);
  }
}
