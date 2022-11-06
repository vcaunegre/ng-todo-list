import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { EditComponent } from './edit/edit.component';

export const appRouteList: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRouteList)],
})
export class AppRoutingModule {}
