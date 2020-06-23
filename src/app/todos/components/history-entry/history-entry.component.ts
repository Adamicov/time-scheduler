import { Component, Input } from '@angular/core';
import { HistoryEntry } from '@models/history-entry';
import { TodoStatusEnum } from '@models/todo-status-enum';

@Component({
  selector: 'app-history-entry',
  templateUrl: './history-entry.component.html',
  styleUrls: ['./history-entry.component.scss'],
})
export class HistoryEntryComponent  {
  todoStatusEnum = TodoStatusEnum;

  @Input() historyEntry: HistoryEntry = {
    title: 'Make breakfast',
    status: TodoStatusEnum.Done,
    date: new Date(),
  };

  get statusDone() {
    return this.historyEntry.status === TodoStatusEnum.Done;
  }

  get statusCanceled() {
    return this.historyEntry.status === TodoStatusEnum.Canceled;
  }

}
