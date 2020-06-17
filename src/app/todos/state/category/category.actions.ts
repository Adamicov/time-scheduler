import { createAction, props } from '@ngrx/store';
import { Category } from '@models/category';

const LOAD_CATEGORIES = '[Category] Load Categories';
const LOAD_CATEGORIES_SUCCESS = '[Category] Load Categories';
const LOAD_CATEGORIES_FAIL = '[Category] Load Categories';

const CREATE_CATEGORY = '[Category] Create Category';
const UPDATE_CATEGORY = '[Category] Update Category';
const DELETE_CATEGORY = '[Category] Delete Category';

export const loadCategories = createAction(LOAD_CATEGORIES);
export const loadCategoriesSuccess = createAction(
  LOAD_CATEGORIES,
  props<{ categories: Category[] }>()
);
export const loadCategoriesFail = createAction(
  LOAD_CATEGORIES_FAIL,
  props<{ error: string }>()
);
export const createCategory = createAction(
  CREATE_CATEGORY,
  props<{ category: Category }>()
);
export const updateCategory = createAction(
  UPDATE_CATEGORY,
  props<{ category: Category }>()
);
export const deleteCategory = createAction(
  DELETE_CATEGORY,
  props<{ categoryId: string }>()
);
