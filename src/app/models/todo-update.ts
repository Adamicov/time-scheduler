import { Category } from '@models/category';

export interface TodoUpdate  {
  id?: string;
  title: string;
  description: string;
  category: Category;
}
