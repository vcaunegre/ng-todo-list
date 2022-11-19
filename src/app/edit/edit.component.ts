import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  formdata: any;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService,
    private router: Router
  ) {}
  ngOnInit(): void {
    let result = this.route.snapshot.paramMap.get('id');
    if (result !== null) {
      this.id = +result;
    }
    if (this.id !== null) {
      this.todo = this.todosService.getTodoById(this.id);
    }
    this.formdata = new UntypedFormGroup({
      message: new UntypedFormControl(this.todo?.message),
    });
  }

  onClickSubmit(data: any) {
    if (this.todo) {
      this.todo.message = data.message;
      console.log(this.todo);

      this.todosService.updateTodo(this.todo);
      this.router.navigate(['home']);
    }
  }
}
