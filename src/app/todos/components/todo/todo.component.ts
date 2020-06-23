import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Todo } from '@models/todo';
import { TodoStatusEnum } from '@models/todo-status-enum';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnChanges {
  @Input() todo: Todo;
  todoStatusEnum = TodoStatusEnum;

  @Output() editTodo = new EventEmitter<Todo>();
  @Output() checkTodoInfo = new EventEmitter<Todo>();

  @Output() markDone = new EventEmitter<Todo>();
  @Output() markCanceled = new EventEmitter<Todo>();

  markAsDone(event: Event): void {
    event.stopPropagation();
    this.markDone.emit(this.todo);
  }

  markAsCanceled(event: Event): void {
    event.stopPropagation();
    this.markCanceled.emit(this.todo);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
