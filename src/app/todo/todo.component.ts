import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  message: string;
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

  constructor() {}

  ngOnInit(): void {}
}
