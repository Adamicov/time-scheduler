import { Category } from '@models/category';
import { CANCELED, DONE, PENDING } from '@models/types';

export interface Todo {
  id?: string;
  title: string;
  description: string;
  category: Category;
  status: DONE | CANCELED | PENDING;
  deadline: Date;
}

