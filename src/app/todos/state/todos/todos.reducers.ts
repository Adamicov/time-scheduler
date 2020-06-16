import { Todo } from '@models/todo';
import { Action, createReducer, on } from '@ngrx/store';
import * as TodosActions from './todos.actions';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import * as uuid from 'uuid';
import { getUniqueId } from '@shared/utils';


export const FEATURE_KEY = 'todos';

export function reducer(state: TodosState | undefined, action: Action) {
  return todosReducer(state, action);
}


export interface TodosState extends EntityState<Todo> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: TodosState = adapter.getInitialState({
  ids: [1, 2, 3],
  entities: {
    1: {
      id: 1,
      title: 'ToDO',
      deadline: new Date(),
      description: 'my todo',
      status: 'DONE',
      category: { name: 'Work', color: '#6f3e19' }
    },
    2: {
      id: 2,
      title: 'Todo Canceled',
      deadline: new Date(),
      description: 'my todo',
      status: 'CANCELED',
      category: { name: 'Work', color: '#6f3e19' }
    },
    3: {
      id: 3,
      title: 'Learn NGRX',
      deadline: new Date(),
      description: 'my todo',
      status: 'DONE',
      category: { name: 'Work', color: '#6f3e19' }
    },
  },
  loaded: false,
  loading: false
});

const todosReducer = createReducer(
  initialState,
  on(TodosActions.loadTodos, (state: TodosState) => ({
    ...state,
    loading: false
  })),
  on(TodosActions.loadTodosFail, (state: TodosState) => ({
    ...state,
    loaded: false,
    loading: false
  })),
  on(TodosActions.loadTodosSuccess, (state: TodosState, { todos }) => {
    return adapter.setAll(todos, { ...state, loaded: true, loading: false });
  }),
  on(TodosActions.createTodo, (state: TodosState, { todo }) => {
    return adapter.addOne({id: getUniqueId(), ...todo}, state);
  }),
  on(TodosActions.updateTodo, (state: TodosState, { todo }) => ({
    ...state
  })),
  on(TodosActions.updateTodoSuccess, (state: TodosState, {todo}) => {
    const update: Update<Todo> = {
      id: todo.id,
      changes: {
        ...todo
      }
    };
    return adapter.updateOne(update, state);
  }),
  on(TodosActions.markTodoDone, (state: TodosState, {todo}) => {
    const update: Update<Todo> = {
      id: todo.id,
      changes: {
        status: 'DONE'
      }
    };
    return adapter.updateOne(update, state);
  }),
  on(TodosActions.markTodoCanceled, (state: TodosState, {todo}) => {
    const update: Update<Todo> = {
      id: todo.id,
      changes: {
        status: 'CANCELED'
      }
    };
    return adapter.updateOne(update, state);
  })
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
