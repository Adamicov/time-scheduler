import * as fromTodos from './todos.reducers';
import { createSelector } from '@ngrx/store';
import { Todo } from '@models/todo';
import { selectTodosModuleState, TodosModuleState } from '../index';
import { TodoStatusEnum } from '@models/todo-status-enum';

const selectTodosState = createSelector(
  selectTodosModuleState,
  (state: TodosModuleState) => state.todos
);

export const selectAllTodos = createSelector(
  selectTodosState,
  fromTodos.selectAll
);

export const selectDoneTodos = createSelector(selectAllTodos, (todos: Todo[]) =>
  todos.filter((todo) => todo.status === TodoStatusEnum.Done)
);

export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter((todo) => todo.status === TodoStatusEnum.Pending)
);

export const selectCanceledTodos = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter((todo: Todo) => todo.status === TodoStatusEnum.Canceled)
);
