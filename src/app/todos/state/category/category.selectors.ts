import { createSelector } from '@ngrx/store';
import * as fromCategories from '../category/category.reducers';
import { selectTodosModuleState, TodosModuleState } from '../index';

const selectCategoriesState = createSelector(
  selectTodosModuleState,
  (state: TodosModuleState) => state[fromCategories.FEATURE_KEY]
);

export const selectAllCategories = createSelector(
  selectCategoriesState,
  fromCategories.selectAll
);
