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

  onClickSubmit(data: any) {
    this.todosService.addTodo({
      id: data.id ? data.id : this.todoList.length,
      message: data.message,
      done: false,
    });
    this.todoList = this.todosService.getTodos();
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
    this.todoList = this.todosService.getTodos();
  }
  ngOnInit(): void {
    const data$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    data$.subscribe({
      next: (value) => console.log(value),
      error: (err) => console.error(err),
      complete: () => console.log('DONE!'),
    });

    this.todoList = this.todosService.getTodos();

    this.formdata = new FormGroup({
      message: new FormControl('message'),
      id: new FormControl(),
    });
  }
}
