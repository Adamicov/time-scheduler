import { createAction, props } from '@ngrx/store';
import { Todo } from '@models/todo';

const LOAD_TODOS = '[Todo] Load todos';
const LOAD_TODOS_FAIL = '[Todo] Load todos Fail';
const LOAD_TODOS_SUCCESS = '[Todo] Load todos Success';

const CREATE_TODO = '[Todo] Create todo';

const UPDATE_TODO = '[Todo] Update todo';
const UPDATE_TODO_SUCCESS = '[Todo] Update todo Success';

const MARK_TODO_DONE = '[Mark Todo] Mark todo Done';
const MARK_TODO_CANCELED = '[Mark Todo] Mark todo Canceled';

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

export const updateTodo = createAction(UPDATE_TODO, props<{ todo: Todo }>());
export const updateTodoSuccess = createAction(
  UPDATE_TODO_SUCCESS,
  props<{ todo: Todo }>()
);

export const markTodoDone = createAction(
  MARK_TODO_DONE,
  props<{ todo: Todo }>()
);
export const markTodoCanceled = createAction(
  MARK_TODO_CANCELED,
  props<{ todo: Todo }>()
);
