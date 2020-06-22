import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
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
import { reducers, todosModule } from './state';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';
import { TodoInfoDialogComponent } from './components/todo-info-dialog/todo-info-dialog.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { TodosChartsComponent } from './components/todos-charts/todos-charts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TodoOverviewComponent } from './containers/todo-overview/todo-overview.component';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    CategoryListComponent,
    CategoryComponent,
    TodoDialogComponent,
    CategoryDialogComponent,
    TodoInfoDialogComponent,
    ConfirmDeleteComponent,
    TodosChartsComponent,
    TodoOverviewComponent,
  ],
  imports: [
    StoreModule.forFeature(todosModule, reducers),
    EffectsModule.forFeature([TodosEffects]),
    NgxChartsModule,
    MatSnackBarModule,
    MatBottomSheetModule,
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
    FormsModule,
  ],
})
export class TodosModule {}
