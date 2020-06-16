import * as fromTodos from './todos.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '@models/todo';

const selectorTodos = createFeatureSelector<fromTodos.TodosState>(
  fromTodos.FEATURE_KEY
);

export const selectAllTodos = createSelector(
  selectorTodos,
  fromTodos.selectAll
);

export const selectDoneTodos = createSelector(selectAllTodos, (todos: Todo[]) =>
  todos.filter((todo) => todo.status === 'DONE')
);

export const selectCanceledTodos = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter((todo: Todo) => todo.status === 'CANCELED')
);
