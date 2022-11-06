import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { AppRoutingModule } from './app-routing.module';
import { TodosService } from './todos.service';
@NgModule({
  declarations: [AppComponent, TodosComponent, TodoComponent, EditComponent],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [TodosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
