import { Todo } from '@models/todo';
import { Action, createReducer, on } from '@ngrx/store';
import * as TodosActions from './todos.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FEATURE_KEY = 'todos';

export function reducer(state: TodosState | undefined, action: Action) {
  return todosReducer(state, action);
}


export interface TodosState extends EntityState<Todo> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export  const initialState: TodosState = adapter.getInitialState({
  ids: [1],
  entities: {
    1: {
      id: 1,
      title: 'ToDO',
      deadline: new Date(),
      description: 'my todo',
      category: { name: 'Work', color: '#6f3e19' }
    }
  },
  loaded: false,
  loading: false
})

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
    return adapter.setAll(todos, {...state, loaded: true, loading: false});
  }),
  on(TodosActions.createTodo, (state: TodosState, { todo }) => {
    return adapter.addOne(todo, state);
  })
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
