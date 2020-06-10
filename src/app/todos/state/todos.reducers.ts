import { Todo } from '@models/todo';
import { Action, createReducer, on } from '@ngrx/store';
import * as TodosActions from './todos.actions';

export const FEATURE_KEY = 'todos';

export function reducer(state: TodosState | undefined, action: Action) {
  return todosReducer(state, action);
}

export interface TodoEntities {
  [id: string]: Todo;
}

export interface TodosState {
  entities: TodoEntities;
  loaded: false;
  loading: false;
}

const initialState: TodosState = {
  entities: {
    1: {
      id: 1,
      title: 'ToDO',
      deadline: new Date(),
      description: 'my todo',
      category:  {name: 'Work', color: '#6f3e19'},
    }
  },
  loaded: false,
  loading: false
};

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
    const entities = todos.reduce((data: TodoEntities, todo: Todo) => {
      return {
        ...data,
        [todo.id]: todo
      };
    }, {});

    return { ...state, entities, loading: false, loaded: true };
  }),
  on(TodosActions.createTodo, (state: TodosState, { todo }) => {
    console.log('XD');
    const entities = {
      ...state.entities,
      [todo.id]: todo
    };
    return { ...state, entities };
  })
);
