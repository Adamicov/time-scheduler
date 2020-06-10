import { Injectable } from '@angular/core';
import { TodosState } from './todos.reducers';
import { Store } from '@ngrx/store';
import { selectTodosData } from './todos.selectors';
import * as TodosActions from './todos.actions';
import { pairs } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Todo } from '@models/todo';

@Injectable({ providedIn: 'root' })
export class TodosFacade {
  todos$ = this.store.select(selectTodosData).pipe(
    tap(todos => console.log(todos)),
    switchMap((todos) => pairs(todos)),
    map(([_, todos]) => [todos]),
    tap((todos) => console.log(todos))
  );

  constructor(private store: Store<TodosState>) {}

  getTodos() {
    this.store.dispatch(TodosActions.loadTodos());
  }

  createTodo(todo: Todo) {
    this.store.dispatch(TodosActions.createTodo({ todo }));
  }

}
