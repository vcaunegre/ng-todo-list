import { Injectable, Output, EventEmitter } from '@angular/core';
import { Todo } from './todo/todo.component';

@Injectable()
export class TodosService {
  todoList: Todo[] = [{ id: 12, message: 'Do something', done: false }];

  getTodos() {
    return this.todoList.slice();
  }

  getTodo(todo: Todo) {
    return this.todoList.indexOf(todo);
  }

  editTodo(todo: Todo) {
    let id = this.todoList.indexOf(todo);
    this.todoList[id] = todo;
  }

  getTodoById(id: number): Todo {
    return this.todoList.filter((todo: Todo) => {
      todo.id = id;
    })[0];
  }

  addTodo(todo: Todo) {
    let result = this.todoList.filter(
      (todoElement) => todoElement.id === todo.id
    );
    if (result.length === 0) {
      this.todoList = [...this.todoList, todo];
    } else {
      alert('Id already taken !');
    }
  }

  deleteTodo(id: number) {
    this.todoList = this.todoList?.filter((todo: Todo) => todo.id !== id);
  }

  @Output() change: EventEmitter<boolean> = new EventEmitter();
}
