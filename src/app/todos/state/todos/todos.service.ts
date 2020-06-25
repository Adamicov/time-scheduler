import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '@models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor() {}

  // fake backend methods

  createTodo(todo: Todo): Observable<Todo> {
    return of(todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return of(todo);
  }

  markTodoDone(todo: Todo): Observable<Todo> {
    return of(todo);
  }

  markTodoCanceled(todo: Todo): Observable<Todo> {
    return of(todo);
  }
}
