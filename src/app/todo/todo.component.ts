import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodosService } from '../todos.service';

export interface Todo {
  id?: number;
  title: string;
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() deleteTodo = new EventEmitter<number>();

  deleteMyTodo(id: any) {
    this.deleteTodo.emit(id);
  }

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {}

  changeDone(todo: Todo) {
    todo.id && this.todosService.changeTodoDone(todo.id, todo);
  }
}
