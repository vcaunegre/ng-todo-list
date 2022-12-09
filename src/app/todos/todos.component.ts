import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo/todo.component';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { TodosService } from '../todos.service';
import { LocalStorageService } from '../localStorage.service';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(
    private todosService: TodosService,
    private localStorageService: LocalStorageService
  ) {}

  userName: any;
  formdata: any;
  todoList: Todo[] = [];

  onClickSubmit(data: any) {
    this.todosService.addTodo({
      id: Math.floor(Math.random() * 10000),
      title: data.title,
      message: 'ok',
      done: false,
    });
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }
  ngOnInit(): void {
    this.todosService.getTodos().subscribe((todos) => (this.todoList = todos));
    this.formdata = new UntypedFormGroup({
      message: new UntypedFormControl('message'),
    });
  }
}
