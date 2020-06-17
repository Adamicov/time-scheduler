import * as fromTodo from './todos/todos.reducers';
import * as fromCategory from './category/category.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const todosModule = 'todosModule';

export interface TodosModuleState {
  todos: fromTodo.TodosState;
  categories: fromCategory.CategoryState;
}

export const reducers = {
  todos: fromTodo.reducer,
  categories: fromCategory.reducer,
};

export const selectTodosModuleState = createFeatureSelector<TodosModuleState>(
  todosModule
);


