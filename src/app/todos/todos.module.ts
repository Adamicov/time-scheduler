import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from './containers/todo-list/todo-list.component';
import { MatCardModule } from '@angular/material/card';
import { TodosRoutingModule } from './todos.routing';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryComponent } from './components/category/category.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './state/todos/todos.effects';
import { SharedModule } from '@shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { todosModule, reducers } from './state';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    CategoryListComponent,
    CategoryComponent,
    TodoDialogComponent,
    CategoryDialogComponent,
  ],
  imports: [
    StoreModule.forFeature(todosModule, reducers),
    EffectsModule.forFeature([TodosEffects]),
    MatSnackBarModule,
    TodosRoutingModule,
    SharedModule,
    MatCardModule,
    CommonModule,
    MatChipsModule,
    MatRippleModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    FormsModule
  ]
})
export class TodosModule {}
