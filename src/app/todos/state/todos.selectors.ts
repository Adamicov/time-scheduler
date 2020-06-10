import * as fromTodos from '../state/todos.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectorTodos = createFeatureSelector<fromTodos.TodosState>(
  fromTodos.FEATURE_KEY
);

export const selectTodosData = createSelector(
  selectorTodos,
  (state: fromTodos.TodosState): fromTodos.TodoEntities => state.entities
);
