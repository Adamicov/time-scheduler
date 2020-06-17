import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@models/category';
import { Todo } from '@models/todo';

export interface TodoDialogData {
  todo?: Todo;
  categories?: Category[] | undefined;
}

export const UPDATE = 'Update';
export const SAVE = 'Save';

export interface TodoDialogResponse {
  todo: Todo;
  action: string;
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss'],
})
export class TodoDialogComponent implements OnInit {
  todo: Todo | undefined;
  todoForm: FormGroup;
  selectedCategory: Category | undefined;
  categories: Category[];
  action: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoDialogData
  ) {}

  ngOnInit(): void {
    this.todo = this.data.todo;
    this.categories = this.data.categories;
    this.action = this.todo ? UPDATE : SAVE;
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [],
      category: ['', Validators.required],
      deadline: ['', Validators.required],
    });
    if (this.todo) {
      this.todoForm.patchValue({ ...this.todo });
      this.selectedCategory = this.todo.category;
      console.log(this.selectedCategory);
    }
  }

  submit(): void {
    if (this.todoForm.invalid) {
      console.log(this.todoForm);
      return;
    }
    const todo: Todo = { ...this.todo, ...this.todoForm.value };
    const dialogResponse: TodoDialogResponse = { todo, action: this.action };
    this.dialogRef.close(dialogResponse);
  }

  compareCategories(o1: Category, o2: Category): boolean {
    return o1.name === o2.name && o1.color === o2.color;
  }
}
