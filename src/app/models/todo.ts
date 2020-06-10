import { Id } from '@models/types';
import { Category } from '@models/category';

export interface Todo {
  id?: Id;
  title: string;
  description: string;
  category: Category;
  deadline: Date;
}
