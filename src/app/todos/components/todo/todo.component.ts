import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '@models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo: Todo;

  @Output() editTodo = new EventEmitter<Todo>();

  @Output() markDone = new EventEmitter<Todo>();
  @Output() markCanceled = new EventEmitter<Todo>();

  markAsDone($event: Event) {
    $event.stopPropagation();
    this.markDone.emit(this.todo);
  }

  markAsCanceled($event: Event) {
    $event.stopPropagation();
    this.markCanceled.emit(this.todo);
  }

  openDescription() {
    // TODO: Dialog with description
  }


}
