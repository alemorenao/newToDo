import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToDoTask } from '../../interfaces/to-do-task';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    
    <form class="needs-validation" [formGroup]="inputForm" (submit)="addToList()">
      <div class="mb-3 mt-3">
        <label for="todo-title" class="form-label">Title</label>
        <input id="todo-title" class="form-control" type="text" formControlName="title" required>
        @if (title?.invalid && (title?.touched || title?.dirty)) {
          <div class="alert">
            <p>This information is requiered</p>
          </div>    
        }
      </div>

      
      <div class="mb-3">
        <label for="todo-details">Details</label>
        <input type="text" class="form-control" id="todo-details" formControlName="details" required>
      </div>
      
      <div class="mb-3">
        <label for="todo-date">Date/Time</label>
        <input type="date" class="form-control" id="todo-date" formControlName="dateTime" required>
      </div>
      <!-- Modal Footer-->
      <div class="modal-footer">
        <p>{{inputForm.status}}</p>
          <button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Add to List</button>
      </div>
    </form> 
  `,
  styleUrl: './form.component.css'
})
export class FormComponent {
  
  @Output() addTask = new EventEmitter<ToDoTask>();

  inputForm = new FormGroup(
    {
      title: new FormControl('', [Validators.required, Validators.minLength(5),]),
      details: new FormControl('', [Validators.required, Validators.minLength(1),]),
      dateTime: new FormControl('', [Validators.required, Validators.minLength(1),])
    }
  )

  get title(){
    return this.inputForm.get('title')
  }

  addToList() {
    let newTask: ToDoTask =
    {
      id: +sessionStorage.getItem("numberOfTasks")!,
      title: this.inputForm.value.title ?? '',
      details: this.inputForm.value.details ?? '',
      dateTime: this.inputForm.value.dateTime ?? '',
      done: false
    }
    
    this.addTask.emit(newTask);
    
  }
}
