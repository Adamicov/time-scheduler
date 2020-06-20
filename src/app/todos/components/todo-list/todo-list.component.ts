import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '@models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent  {

  @Input() todos: Todo[]

  @Output() editTodo = new EventEmitter<Todo>();
  @Output() markTodoCanceled = new EventEmitter<Todo>();
  @Output() markTodoDone = new EventEmitter<Todo>();
}
