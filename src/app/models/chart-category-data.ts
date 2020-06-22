import { Category } from '@models/category';

export interface NgxChartsData {
  name: string;
  value: number;
}

export interface TodosAmountData {
  [categoryName: string]: {
    categoryName: string;
    todosAmount: number;
    category: Category;
  }
}

