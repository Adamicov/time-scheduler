import { createAction, props } from '@ngrx/store';
import { Todo } from '@models/todo';

const LOAD_TODOS = '[Todo] Load todos';
const LOAD_TODOS_FAIL = '[Todo] Load todos Fail';
const LOAD_TODOS_SUCCESS = '[Todo] Load todos Success';

const CREATE_TODO = '[Todo] Create todo';

const UPDATE_TODO = '[Todo]';
const UPDATE_TODO_DONE = '[Todo Status] Update Todo Done';
const UPDATE_TODO_PROGRESS = '[Todo Status] Update Todo Progress';

export const loadTodos = createAction(LOAD_TODOS);

export const loadTodosFail = createAction(
  LOAD_TODOS_FAIL,
  props<{ error: string }>()
);

export const loadTodosSuccess = createAction(
  LOAD_TODOS_SUCCESS,
  props<{ todos: Todo[] }>()
);

export const createTodo = createAction(CREATE_TODO, props<{ todo: Todo }>());
