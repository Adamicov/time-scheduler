import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodosFacade } from '../../state/todos/todos.facade';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Todo } from '@models/todo';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoDialogComponent, TodoDialogResponse } from '../../components/todo-dialog/todo-dialog.component';
import { CategoriesFacade } from '../../state/category/category.facade';
import { Category } from '@models/category';
import { CategoryDialogResponse } from '../../components/category-dialog/category-dialog.component';
import { CrudEnum } from '@models/crud-enum';
import { TodoInfoDialogComponent } from '../../components/todo-info-dialog/todo-info-dialog.component';

@Component({
  selector: 'app-todo-overview',
  templateUrl: './todo-overview.component.html',
  styleUrls: ['./todo-overview.component.scss'],
})
export class TodoOverviewComponent implements OnInit, OnDestroy {
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


  editTodo(todo: Todo) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: { todo, categories: this.categories },
    });
    this.closeDialog(dialogRef);
  }

  createTodo(): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: { categories: this.categories },
    });
    this.closeDialog(dialogRef);
  }


  closeDialog(dialogRef: MatDialogRef<TodoDialogComponent>): void {
    dialogRef
      .afterClosed()
      .pipe(
        filter((res) => !!res),
        tap((res: TodoDialogResponse) => this.handleTodoDialogResponse(res))
      )
      .subscribe();
  }

  handleTodoDialogResponse(res: TodoDialogResponse): void {
    switch (res.action) {
      case CrudEnum.Save:
        this.todosFacade.createTodo(res.todo);
        break;
      case CrudEnum.Update:
        this.todosFacade.updateTodo(res.todo);
        break;
    }
  }

  handleCategoryDialogResponse(res: CategoryDialogResponse): void {
    switch (res.action) {
      case CrudEnum.Save:
        this.categoriesFacade.createCategory(res.data);
        break;
      case CrudEnum.Update:
        this.categoriesFacade.updateCategory(res.data);
        break;
      case CrudEnum.Delete:
        this.categoriesFacade.deleteCategory(res.data);
    }
  }

  markTodoDone(todo: Todo): void {
    this.todosFacade.markTodoDone(todo);
  }

  markTodoCanceled(todo: Todo): void {
    this.todosFacade.markTodoCanceled(todo);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openTodoInfoDialog(todo: Todo) {
    const dialogRef = this.dialog.open(TodoInfoDialogComponent, { data: todo });

  }
}
