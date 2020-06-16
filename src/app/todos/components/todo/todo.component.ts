import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '@models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo: Todo;

  @Output() todoClicked = new EventEmitter<Todo>();

  @Output() markDone = new EventEmitter<Todo>();
  @Output() markCanceled = new EventEmitter<Todo>();

  markAsDone($event) {
    $event.stopPropagation();
    this.markDone.emit(this.todo);
  }

  markAsCanceled($event) {
    $event.stopPropagation();
    this.markCanceled.emit(this.todo);
  }
}
