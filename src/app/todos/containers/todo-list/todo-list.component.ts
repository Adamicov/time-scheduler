import { Component, OnInit } from '@angular/core';
import { TodosFacade } from '../../state/todos.facade';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Todo } from '@models/todo';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<any>;

  constructor(private todosFacade: TodosFacade, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todos$ = this.todosFacade.todos$.pipe(tap((c) => console.log(c)));
  }

  todoClicked(todo: Todo) {
    const dialogRef = this.dialog.open(TodoDialogComponent);
  }

  createTodo() {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: {},
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((todo) => !!todo),
        tap((todo) => this.todosFacade.createTodo(todo))
      )
      .subscribe();
  }
}
