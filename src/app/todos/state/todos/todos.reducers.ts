import { Todo } from '@models/todo';
import { Action, createReducer, on } from '@ngrx/store';
import * as TodosActions from './todos.actions';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { getCategoryById, getUniqueId } from '@shared/utils';
import { TodoStatusEnum } from '@models/todo-status-enum';

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
  ids: [2, 3, 4, 5, 6],
  entities: {
    2: {
      id: 2,
      title: 'Make breakfast',
      deadline: new Date(),
      description: 'my todo',
      status: TodoStatusEnum.Pending,
      category: getCategoryById(1)
    },
    3: {
      id: 3,
      title: 'Create Project with Angular',
      deadline: new Date(),
      description: 'my todo',
      status: TodoStatusEnum.Pending,
      category:  getCategoryById(3)
    },
    4: {
      id: 4,
      title: 'Run 20km',
      deadline: new Date(),
      description: 'my todo',
      status: TodoStatusEnum.Pending,
      category:  getCategoryById(2)
    },
    5: {
      id: 5,
      title: 'Learn Data Structures and Algorithms',
      deadline: new Date(),
      description: 'my todo',
      status: TodoStatusEnum.Pending,
      category:  getCategoryById(4)
    },
    6: {
      id: 6,
      title: 'Deliver functionality to client',
      deadline: new Date(),
      description: 'my todo',
      status: TodoStatusEnum.Pending,
      category:  getCategoryById(7)
    }
  },
  loaded: false,
  loading: false,
});

const todosReducer = createReducer(
  initialState,
  on(TodosActions.loadTodos, (state: TodosState) => ({
    ...state,
    loading: false,
  })),
  on(TodosActions.loadTodosFail, (state: TodosState) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  on(TodosActions.loadTodosSuccess, (state: TodosState, { todos }) => {
    return adapter.setAll(todos, { ...state, loaded: true, loading: false });
  }),
  on(TodosActions.createTodo, (state: TodosState, { todo }) => {
    return adapter.addOne(
      { id: getUniqueId(), status: TodoStatusEnum.Pending, ...todo },
      state
    );
  }),
  on(TodosActions.updateTodo, (state: TodosState, { todo }) => ({
    ...state,
  })),
  on(TodosActions.updateTodoSuccess, (state: TodosState, { todo }) => {
    const update: Update<Todo> = {
      id: todo.id,
      changes: {
        ...todo,
      },
    };
    return adapter.updateOne(update, state);
  }),
  on(TodosActions.markTodoDone, (state: TodosState, { todo }) => {
    const update: Update<Todo> = {
      id: todo.id,
      changes: {
        status: TodoStatusEnum.Done,
      },
    };
    return adapter.updateOne(update, state);
  }),
  on(TodosActions.cancelTodo, (state: TodosState, {todo}) => {
    return {...state}
  }),
  on(TodosActions.cancelConfirm, (state: TodosState, { instance }) => {
    const update: Update<Todo> = {
      id: instance.id,
      changes: {
        status: TodoStatusEnum.Canceled,
      },
    };
    return adapter.updateOne(update, state);
  })
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
