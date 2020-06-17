import { Injectable } from '@angular/core';
import * as CategoryActions from './category.actions';
import { CategoryState } from './category.reducers';
import { selectAllCategories } from './category.selectors';
import { Store } from '@ngrx/store';
import { Category } from '@models/category';

@Injectable({ providedIn: 'root' })
export class CategoriesFacade {
  categories$ = this.store.select(selectAllCategories);

  constructor(private store: Store<CategoryState>) {}

  getCategories() {
    this.store.dispatch(CategoryActions.loadCategories());
  }

  createCategory(category: Category) {
    this.store.dispatch(CategoryActions.createCategory({ category }));
  }

  updateCategory(category: Category) {
    this.store.dispatch(CategoryActions.updateCategory({ category }));
  }

  deleteCategory(category: Category) {
    this.store.dispatch(
      CategoryActions.deleteCategory({ categoryId: category.id })
    );
  }
}
