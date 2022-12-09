import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  findIndex,
  from,
  map,
  Observable,
  of,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { Todo } from './todo/todo.component';
import { LocalStorageService } from './localStorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorException } from './model/Error';

@Injectable()
export class TodosService {
  private todoList: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private requestError = new Subject<string>();

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
    return this.http.get<Todo[]>('http://localhost:8080/todos').pipe(
      map((responseData: Todo[]) => {
        let todosArray: Todo[] = [];
        for (const todo of responseData) {
          todosArray = [...todosArray, todo];
        }
        responseData.sort((todo1, todo2) => todo1.id! - todo2.id!);
        return responseData;
      })
    );
  }

  getTodos(): Observable<Todo[]> {
    return this.todoList;
  }

  getRequestError(): Observable<string> {
    return this.requestError;
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
      .post<Todo>('http://localhost:8080/todos', todo)
      .pipe(catchError((error) => throwError(() => error)))
      .subscribe((res) => {
        this.todoList.next([...this.todoList.getValue(), res]);
      });
  }

  deleteTodo(todoId: number) {
    this.http
      .delete<Todo[]>('http://localhost:8080/todos/' + todoId)
      .subscribe({
        next: (result) => this.todoList.next(result),
        error: (err: ErrorException) => this.requestError.next(err.message),
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

  changeTodoDone(id: number, todo: Todo) {
    this.http
      .put<Todo[]>('http://localhost:8080/todos/done/' + id, todo)
      .subscribe((result) => {
        let newTodoList: Todo[] = this.todoList.getValue().map((todo) => {
          if (todo.id === id) todo.done = !todo.done;
          return todo;
        });
        this.todoList.next(newTodoList);
      });
  }
}
