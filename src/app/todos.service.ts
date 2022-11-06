import { Injectable, Output, EventEmitter } from '@angular/core';
import { filter, findIndex, from, map } from 'rxjs';
import { Todo } from './todo/todo.component';

@Injectable()
export class TodosService {
  todoListBase: Todo[] = [{ id: 12, message: 'Do something', done: false }];
  todoList = from(this.todoListBase);

  getTodos() {
    return this.todoList.subscribe();
  }

  getTodo(todo: Todo) {
    return this.todoList.pipe(filter((myTodo) => todo === myTodo));
  }

  editTodo(todo: Todo) {
    this.todoList.pipe(
      map((myTodo) => {
        if (myTodo.id == todo.id) {
          return todo;
        }
        return myTodo;
      })
    );
  }

  getTodoById(id: number) {
    // return this.todoList.filter((todo: Todo) => {
    //   todo.id = id;
    // })[0];
  }

  addTodo(todo: Todo) {
    this.todoList.pipe(
      map((myTodo) => {
        if (myTodo.id == todo.id) {
          return todo;
        }
        return myTodo;
      })
    );
  }

  deleteTodo(id: number) {
    this.todoList = this.todoList?.pipe(filter((todo: Todo) => todo.id !== id));
  }

  @Output() change: EventEmitter<boolean> = new EventEmitter();
}
