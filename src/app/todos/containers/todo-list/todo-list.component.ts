import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodosFacade } from '../../state/todos/todos.facade';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Todo } from '@models/todo';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  SAVE,
  TodoDialogComponent,
  TodoDialogResponse,
  UPDATE,
} from '../../components/todo-dialog/todo-dialog.component';
import { CategoriesFacade } from '../../state/category/category.facade';
import { Category } from '@models/category';
import {
  CategoryDialogResponse,
  DELETE,
} from '../../components/category-dialog/category-dialog.component';
import { TodoInfoDialogComponent } from '../../components/todo-info-dialog/todo-info-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todosDone$: Observable<Todo[]>;
  todosPending$: Observable<Todo[]>;
  categories: Category[];

  subscription = new Subscription();

  constructor(
    private todosFacade: TodosFacade,
    private categoriesFacade: CategoriesFacade,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.todosDone$ = this.todosFacade.todosDone$;
    this.todosPending$ = this.todosFacade.todosPending$;
    this.subscription.add(
      this.categoriesFacade.categories$.subscribe((categories: Category[]) => {
        this.categories = categories;
      })
    );
  }

  todoClicked(todo: Todo) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: { todo, categories: this.categories },
    });
    this.closeDialog(dialogRef);
  }

  createTodo() {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: { categories: this.categories },
    });
    this.closeDialog(dialogRef);
  }

  closeDialog(dialogRef: MatDialogRef<TodoDialogComponent>) {
    dialogRef
      .afterClosed()
      .pipe(
        filter((res) => !!res),
        tap((res: TodoDialogResponse) => this.handleTodoDialogResponse(res))
      )
      .subscribe();
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

  handleCategoryDialogResponse(res: CategoryDialogResponse) {
    console.log(res);
    switch (res.action) {
      case SAVE:
        this.categoriesFacade.createCategory(res.data);
        break;
      case UPDATE:
        this.categoriesFacade.updateCategory(res.data);
        break;
      case DELETE:
        this.categoriesFacade.deleteCategory(res.data);
    }
  }

  markTodoDone(todo: Todo) {
    this.todosFacade.markTodoDone(todo);
  }

  markTodoCanceled(todo: Todo) {
    this.todosFacade.markTodoCanceled(todo);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openTodoInfoDialog(todo: Todo) {
    const dialogRef = this.dialog.open(TodoInfoDialogComponent, { data: todo });

  }
}
