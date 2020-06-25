/**
 * generate groups of random characters
 * @example getUniqueId(1) : 607f
 * @example getUniqueId(2) : 95ca-361a-f8a1-1e73
 */

import {initialState as categoriesState}  from '../todos/state/category/category.reducers';

export function getUniqueId(parts: number = 5): string {
  const stringArr = [];
  for (let i = 0; i < parts; i++) {
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
}

export const trackById = (index, item) => item.id;

// Helper function for setting initial todos;
export function getCategoryById(id) {
  return categoriesState.entities[id];
}
