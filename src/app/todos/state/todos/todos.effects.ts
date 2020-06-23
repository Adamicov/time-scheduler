import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromTodos from './todos.actions';
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { TodosService } from './todos.service';
import { Todo } from '@models/todo';
import { Store } from '@ngrx/store';
import { TodosState } from './todos.reducers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { selectAllTodos } from './todos.selectors';

@Injectable()
export class TodosEffects {
  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTodos.updateTodo),
      concatMap((action) => {
        return this.todoService
          .updateTodo(action.todo)
          .pipe(map((todo: Todo) => fromTodos.updateTodoSuccess({ todo })));
      })
    )
  );

  updateTodoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromTodos.updateTodoSuccess),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(this.store.select(selectAllTodos)),
            tap((_) =>
              this.snackbar.open('Hello', 'Dismiss', {
                duration: 3000,
              })
            )
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private todoService: TodosService,
    private store: Store<TodosState>,
    private snackbar: MatSnackBar
  ) {}
}
