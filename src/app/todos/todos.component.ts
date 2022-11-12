import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo/todo.component';
import { FormGroup, FormControl } from '@angular/forms';
import { TodosService } from '../todos.service';
import { DemoService } from '../demo.service';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(
    private todosService: TodosService,
    private demoService: DemoService
  ) {}

  userName: any;
  formdata: any;
  todoList: Todo[] = [];
  idVal = 0;

  onClickSubmit(data: any) {
    this.todosService.addTodo({
      id: this.idVal,
      message: data.message,
      done: false,
    });
    this.idVal++;
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }
  ngOnInit(): void {
    this.todosService.getTodos().subscribe((todos) => (this.todoList = todos));
    this.formdata = new FormGroup({
      message: new FormControl('message'),
    });
  }
}
