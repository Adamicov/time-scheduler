import { Category } from '@models/category';

export interface NgxChartsData {
  name: string;
  value: number;
}

export interface TodoAmountObject {
  categoryName: string;
  todosAmount: number;
  category: Category;
}

export interface TodosAmountData {
  [categoryName: string]: TodoAmountObject;
}

export function createNgxChartsDataFromTodosAmount(
  data: TodosAmountData
): NgxChartsData[] {
  return Object.values(data).map((obj: TodoAmountObject) => {
    return {
      name: obj.categoryName,
      value: obj.todosAmount,
    };
  });
}
