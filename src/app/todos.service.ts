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
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodosService {
  private todoList: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {
    // let result = this.localStorageService.getData('todos');
    this.getAllTodos().subscribe((result) => {
      this.todoList.next(result);
    });
  }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<any>('http://localhost:8080/todos').pipe(
      map((responseData: Todo[]) => {
        let todosArray: Todo[] = [];
        for (const todo of responseData) {
          todosArray = [...todosArray, todo];
        }
        return responseData;
      })
    );
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

  addTodo(todo: Todo): void {
    this.http
      .post('http://localhost:8080/todos', todo)
      .subscribe((res) =>
        this.todoList.next([...this.todoList.getValue(), todo])
      );
  }

  deleteTodo(todoId: number) {
    this.http
      .delete<Todo[]>('http://localhost:8080/todos/' + todoId)
      .subscribe((res) => {
        return this.todoList.next(res);
      });
  }
  updateTodo(todo: Todo) {
    this.http
      .put('http://localhost:8080/todos/' + todo.id, todo, {
        params: { 'Content-Type': 'application/json' },
      })
      .subscribe((result) => {
        this.todoList.next([]);
      });

    this.localStorageService.saveData('todos', this.todoList.getValue());
  }
}
