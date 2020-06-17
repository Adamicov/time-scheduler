import * as uuid from 'uuid';
import { getUniqueId } from '@shared/utils';
import { Category } from '@models/category';
import { Action, createReducer, on } from '@ngrx/store';
import {
  createEntityAdapter,
  EntityAdapter,
  EntityState,
  Update,
} from '@ngrx/entity';
import * as CategoriesActions from './category.actions';
import { updateCategory } from './category.actions';

export const FEATURE_KEY = 'categories';

export function reducer(state: CategoryState | undefined, action: Action) {
  return categoryReducer(state, action);
}

export interface CategoryState extends EntityState<Category> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialState: CategoryState = adapter.getInitialState({
  ids: [1, 2],
  entities: {
    1: {
      id: 1,
      name: 'Work',
      color: '#6f3e19',
    },
    2: {
      id: 2,
      name: 'Sport',
      color: '#de5c07',
    },
  },
  loading: false,
  loaded: false,
});
const categoryReducer = createReducer(
  initialState,
  on(CategoriesActions.loadCategories, (state: CategoryState) => {
    return { ...state, loading: true };
  }),
  on(CategoriesActions.createCategory, (state: CategoryState, { category }) => {
    return adapter.addOne({ id: getUniqueId(), ...category }, state);
  }),
  on(CategoriesActions.updateCategory, (state: CategoryState, { category }) => {
    const update: Update<Category> = {
      id: category.id,
      changes: {
        ...category,
      },
    };
    return adapter.updateOne(update, state);
  }),
  on(CategoriesActions.deleteCategory, (state: CategoryState, {categoryId}) => {
    return adapter.removeOne(categoryId, state);
  })
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
