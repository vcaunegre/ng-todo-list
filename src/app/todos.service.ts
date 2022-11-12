import { Injectable, Output, EventEmitter } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  findIndex,
  from,
  map,
  Observable,
  of,
  Subject,
} from 'rxjs';
import { Todo } from './todo/todo.component';

@Injectable()
export class TodosService {
  private todoList: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  getTodos(): Observable<Todo[]> {
    return this.todoList;
  }

  getTodoById(id: number) {
    let result = this.todoList.getValue().filter((res) => res.id == id);
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }

  updateTodo(todo: Todo) {
    let newTodoList = this.todoList.getValue();
    let position = newTodoList.indexOf(todo);
    newTodoList[position] = todo;
    this.todoList.next(newTodoList);
  }

  addTodo(todo: Todo): void {
    this.todoList.next([...this.todoList.getValue(), todo]);
  }

  deleteTodo(todoId: number) {
    let newTodoList = this.todoList.getValue();
    newTodoList = newTodoList.filter((todo) => todo.id !== todoId);
    this.todoList.next(newTodoList);
  }
}
