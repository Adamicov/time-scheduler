import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '@models/todo';

@Component({
  selector: 'app-todo-info-dialog',
  templateUrl: './todo-info-dialog.component.html',
  styleUrls: ['./todo-info-dialog.component.scss'],
})
export class TodoInfoDialogComponent implements OnInit {
  todo: Todo;
  constructor(
    private dialog: MatDialogRef<TodoInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Todo
  ) {}

  ngOnInit(): void {
    this.todo = this.data;

  }
}
