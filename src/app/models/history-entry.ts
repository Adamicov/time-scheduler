import { TodoStatusEnum } from '@models/todo-status-enum';

export interface HistoryEntry {
  status: TodoStatusEnum;
  title: string;
  date: Date;
}
