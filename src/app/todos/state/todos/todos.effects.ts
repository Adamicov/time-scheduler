import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as fromTodos from './todos.actions';
import { concatMap, exhaustMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { TodosService } from './todos.service';
import { Todo } from '@models/todo';
import { Action, Store } from '@ngrx/store';
import { TodosState } from './todos.reducers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { selectAllTodos } from './todos.selectors';
import { SNACKBAR_MS_DURATION, TODO_CANCELED_MESSAGE, TODO_CREATED_MESSAGE, TODO_UPDATE_MESSAGE } from '../../config';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {
  ConfirmDeleteResponse,
  ConfirmDeleteComponent
} from '../../components/confirm-delete/confirm-delete.component';

@Injectable()
export class TodosEffects {
  @Effect()
  createTodo = this.actions$.pipe(
    ofType(fromTodos.createTodo),
    concatMap((action) => {
      return this.todoService
        .createTodo(action.todo)
        .pipe(map((todo: Todo) => fromTodos.createTodoSuccess({ todo })));
    })
  );

  @Effect({ dispatch: false })
  createTodoSuccess = this.actions$.pipe(
    ofType(fromTodos.createTodoSuccess),
    concatMap((action: Action) => {
      console.log(action);
      return of(action).pipe(
        withLatestFrom(this.store.select(selectAllTodos)),
        tap((_) =>
          this.snackbar.open(TODO_CREATED_MESSAGE, 'Dismiss', {
            duration: SNACKBAR_MS_DURATION,
          })
        )
      );
    })
  );

  @Effect()
  cancelTodo = this.actions$.pipe(
    ofType(fromTodos.cancelTodo),
    exhaustMap((action) => {
      const bottomSheetRef = this.matBottomSheet.open(
        ConfirmDeleteComponent,
        { data: { instance: action.todo, message: TODO_CANCELED_MESSAGE } }
      );
      return bottomSheetRef.afterDismissed();
    }),
    map((result: ConfirmDeleteResponse) => {
      if (result === undefined) {
        return fromTodos.sheetClose();
      }
      return fromTodos.cancelConfirm({ instance: result.instance });
    })
  );

  @Effect({ dispatch: false })
  cancelTodoConfirmed = this.actions$.pipe(
    ofType(fromTodos.cancelConfirm),
    concatMap((action) => {
      return of(action).pipe(
        tap((_) =>
          this.snackbar.open(TODO_CANCELED_MESSAGE, 'Dismiss', {
            duration: SNACKBAR_MS_DURATION,
          })
        )
      );
    })
  );

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
              this.snackbar.open(TODO_UPDATE_MESSAGE, 'Dismiss', {
                duration: SNACKBAR_MS_DURATION,
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
    private snackbar: MatSnackBar,
    private matBottomSheet: MatBottomSheet
  ) {}
}
