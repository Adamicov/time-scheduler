import * as fromTodos from './todos.reducers';
import { createSelector } from '@ngrx/store';
import { Todo } from '@models/todo';
import { selectTodosModuleState, TodosModuleState } from '../index';

const selectTodosState = createSelector(
  selectTodosModuleState,
  (state: TodosModuleState) => state.todos
);

export const selectAllTodos = createSelector(
  selectTodosState,
  fromTodos.selectAll
);

export const selectDoneTodos = createSelector(selectAllTodos, (todos: Todo[]) =>
  todos.filter((todo) => todo.status === 'DONE')
);

export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter((todo) => todo.status === 'PENDING')
);

export const selectCanceledTodos = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter((todo: Todo) => todo.status === 'CANCELED')
);
