import { Category } from '@models/category';

export function compareCategoriesFn(o1: Category, o2: Category): boolean {
  return o1.name === o2.name && o1.color === o2.color;
}
