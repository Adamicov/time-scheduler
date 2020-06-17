import { Injectable } from '@angular/core';
import { TodosState } from './todos.reducers';
import { Store } from '@ngrx/store';
import {
  selectAllTodos,
  selectCanceledTodos,
  selectDoneTodos, selectPendingTodos
} from './todos.selectors';
import * as TodosActions from './todos.actions';
import { Todo } from '@models/todo';

@Injectable({ providedIn: 'root' })
export class TodosFacade {
  todosDone$ = this.store.select(selectDoneTodos)
  todosPending$ = this.store.select(selectPendingTodos);
  todosCanceled$ = this.store.select(selectCanceledTodos);

  constructor(private store: Store<TodosState>) {}

  getTodos() {
    this.store.dispatch(TodosActions.loadTodos());
  }

  createTodo(todo: Todo) {
    this.store.dispatch(TodosActions.createTodo({ todo }));
  }

  updateTodo(todo: Todo) {
    this.store.dispatch(TodosActions.updateTodo({ todo }));
  }

  markTodoDone(todo: Todo) {
    this.store.dispatch(TodosActions.markTodoDone({ todo }));
  }

  markTodoCanceled(todo: Todo) {
    this.store.dispatch(TodosActions.markTodoCanceled({ todo }));
  }
}
