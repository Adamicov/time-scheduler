import { getUniqueId } from '@shared/utils';
import { Category } from '@models/category';
import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import * as CategoriesActions from './category.actions';
import { COLORS } from '../../config';

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
  ids: [1, 2, 3, 4, 5, 6, 7],
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
    3: {
      id: 3,
      name: 'Programming',
      color: COLORS[3]
    },
    4: {
      id: 4,
      name: 'Study',
      color: COLORS[4]
    },
    5: {
      id: 5,
      name: 'Read',
      color: COLORS[5]
    },
    6: {
      id: 6,
      name: 'Rest',
      color: COLORS[6]
    },
    7: {
      id: 7,
      name: 'Work',
      color: COLORS[7]
    }
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
