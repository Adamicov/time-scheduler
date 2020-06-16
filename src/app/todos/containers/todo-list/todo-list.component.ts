import { Component, OnInit } from '@angular/core';
import { TodosFacade } from '../../state/todos/todos.facade';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Todo } from '@models/todo';
import { MatDialog } from '@angular/material/dialog';
import { SAVE, TodoDialogComponent, TodoDialogResponse, UPDATE } from '../../components/todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todosDone$: Observable<Todo[]>;
  todosCanceled$: Observable<Todo[]>;

  constructor(private todosFacade: TodosFacade, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.todos$ = this.todosFacade.todos$.pipe(tap((c) => console.log(c)));
  }

  todoClicked(todo: Todo) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: { todo }
    });
    this.closeDialog(dialogRef);
  }

  createTodo() {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: {}
    });
    this.closeDialog(dialogRef);
  }

  closeDialog(dialogRef) {
    dialogRef.afterClosed().pipe(
      filter(res => !!res),
      tap((res: TodoDialogResponse) => this.handleTodoDialogResponse(res))
    ).subscribe();
  }

  handleTodoDialogResponse(res: TodoDialogResponse) {
    switch (res.action) {
      case SAVE:
        this.todosFacade.createTodo(res.todo);
        break;
      case UPDATE:
        this.todosFacade.updateTodo(res.todo);
        break;
    }
  }

  markTodoDone(todo: Todo) {
    this.todosFacade.markTodoDone(todo);
  }

  markTodoCanceled(todo: Todo) {
    this.todosFacade.markTodoCanceled(todo);
  }
}
