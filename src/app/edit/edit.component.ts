import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo/todo.component';
import { TodosService } from '../todos.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: number | null;
  todo!: Todo;
  formdata: any;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService
  ) {}

  onClickSubmit(data: any) {
    this.todo.message = this.formdata.message;
    this.todosService.editTodo(this.todo);
  }

  ngOnInit(): void {
    this.todo;
    this.formdata = new FormGroup({
      message: new FormControl(),
    });

    let result = this.route.snapshot.paramMap.get('id');
    if (result !== null) {
      this.id = +result;
    }
    if (this.id !== null) {
      this.todo = this.todosService.getTodoById(this.id);
    }
  }
}
