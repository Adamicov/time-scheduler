import { Injectable } from '@angular/core';
import { TodosState } from './todos.reducers';
import { Store } from '@ngrx/store';
import { selectAllTodos } from './todos.selectors';
import * as TodosActions from './todos.actions';
import { Todo } from '@models/todo';

@Injectable({ providedIn: 'root' })
export class TodosFacade {
  todos$ = this.store.select(selectAllTodos);

  constructor(private store: Store<TodosState>) {}

  getTodos() {
    this.store.dispatch(TodosActions.loadTodos());
  }

  createTodo(todo: Todo) {
    this.store.dispatch(TodosActions.createTodo({ todo }));
  }

}
