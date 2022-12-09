import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo/todo.component';
import { TodosService } from '../todos.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: number | null;
  todo!: Todo | null;
  formdata!: UntypedFormGroup;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService
  ) {}
  ngOnInit(): void {
    this.formdata = new UntypedFormGroup({
      title: new UntypedFormControl(''),
      description: new UntypedFormControl(''),
    });

    let result = this.route.snapshot.paramMap.get('id');
    if (result !== null) {
      this.id = +result;
    }
    if (this.id !== null) {
      this.todo = this.todosService.getTodoById(this.id);
    }
  }

  onClickSubmit(data: any) {
    if (this.todo) {
      this.todo.description = data.description;
      console.log(this.todo);

      this.todosService.updateTodo(this.todo);
    }
  }
}
