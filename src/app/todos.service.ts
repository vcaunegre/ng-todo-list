import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
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
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class TodosService {
  private todoList: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  constructor(private localStorageService: LocalStorageService) {
    let result = this.localStorageService.getData('todos');
    this.todoList.next(result);
  }

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
    this.localStorageService.saveData('todos', this.todoList.getValue());
  }

  addTodo(todo: Todo): void {
    this.todoList.next([...this.todoList.getValue(), todo]);
    this.localStorageService.saveData('todos', this.todoList.getValue());
  }

  deleteTodo(todoId: number) {
    let newTodoList = this.todoList.getValue();
    newTodoList = newTodoList.filter((todo) => todo.id !== todoId);
    this.todoList.next(newTodoList);
    this.localStorageService.saveData('todos', this.todoList.getValue());
  }
}
