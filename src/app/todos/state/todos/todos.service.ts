import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '@models/todo';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor() {}

  updateTodo(todo: Todo): Observable<Todo> {
    return of(todo).pipe(timeout(4000));
  }

  markTodoDone(todo: Todo): Observable<Todo> {
    return of(todo);
  }

  markTodoCanceled(todo: Todo): Observable<Todo> {
    return of(todo);
  }
}
