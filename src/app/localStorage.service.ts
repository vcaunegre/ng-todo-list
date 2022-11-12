import { Injectable } from '@angular/core';
import { Todo } from './todo/todo.component';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public saveData(key: string, value: Todo[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string): Todo[] {
    let result = localStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    } else {
      return [];
    }
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  constructor() {}
}
