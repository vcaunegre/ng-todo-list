import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../todo/todo.component';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { TodosService } from '../todos.service';
import { LocalStorageService } from '../localStorage.service';
import { interval, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService, private http: HttpClient) {}

  userName: any;
  formdata!: UntypedFormGroup;
  error!: string;
  todoList: Todo[] = [];

  addTodo(data: any) {
    this.todosService.addTodo({
      title: data.title,
      description: data.description,
      done: false,
    });
    this.formdata.setValue({ title: '', description: '' });
    console.log(this.formdata.value);
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }
  ngOnInit(): void {
    this.todosService.getTodos().subscribe((todos) => (this.todoList = todos));
    this.formdata = new UntypedFormGroup({
      title: new UntypedFormControl(''),
      description: new UntypedFormControl(''),
    });

    this.todosService.getRequestError()?.subscribe((result) => {
      this.error = result;
    });
  }

  fetchAwsApp() {
    this.http
      .get('https://todos-crud-dev.eu-west-3.elasticbeanstalk.com/todos')
      .subscribe((res) => console.log(res));
  }
}
