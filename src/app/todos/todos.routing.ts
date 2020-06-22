import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoOverviewComponent } from './containers/todo-overview/todo-overview.component';

const routes: Routes = [
  { path: '', component: TodoOverviewComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule {
}
