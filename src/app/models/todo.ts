import { Category } from '@models/category';
import { TodoStatusEnum } from '@models/todo-status-enum';

export interface Todo {
  id?: string;
  title: string;
  description: string;
  category: Category;
  status: TodoStatusEnum;
  deadline: Date;
}

