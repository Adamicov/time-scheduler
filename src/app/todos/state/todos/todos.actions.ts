import { createAction, props } from '@ngrx/store';
import { Todo } from '@models/todo';

const LOAD_TODOS = '[Todo] Load todos';
const LOAD_TODOS_SUCCESS = '[Todo] Load todos Success';
const LOAD_TODOS_FAIL = '[Todo] Load todos Fail';

const CREATE_TODO = '[Todo] Create todo';
const CREATE_TODO_SUCCESS = '[Todo] Create todo Success';
const CREATE_TODO_FAIL = '[Todo] Create todo Fail';

const UPDATE_TODO = '[Todo] Update todo';
const UPDATE_TODO_SUCCESS = '[Todo] Update todo Success';

const MARK_TODO_DONE = '[Mark Todo] Mark todo Done';

export const CANCEL_TODO = '[Todo] Cancel todo';
export const CANCEL_TODO_CONFIRMED = '[Todo] Cancel todo Confirmed';

export const CONFIRM_SHEET_CLOSE = '[BottomSheet] BottomSheet Close';

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
export const createTodoSuccess = createAction(
  CREATE_TODO_SUCCESS,
  props<{ todo: Todo }>()
);

export const updateTodo = createAction(UPDATE_TODO, props<{ todo: Todo }>());
export const updateTodoSuccess = createAction(
  UPDATE_TODO_SUCCESS,
  props<{ todo: Todo }>()
);

export const markTodoDone = createAction(
  MARK_TODO_DONE,
  props<{ todo: Todo }>()
);
export const cancelTodo = createAction(CANCEL_TODO, props<{ todo: Todo }>());
export const cancelConfirm = createAction(
  CANCEL_TODO_CONFIRMED,
  props<{ instance: Todo }>()
);

export const sheetClose = createAction(CONFIRM_SHEET_CLOSE);
