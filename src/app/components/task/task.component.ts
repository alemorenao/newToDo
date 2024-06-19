import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ToDoTask } from '../../interfaces/to-do-task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  template: `
    <section class="container">
      <h3>Title: {{ taskData.title }}</h3>
      <p>Details: {{ taskData.details }}</p>
      <p>Date/Time {{ taskData.dateTime }}</p>
      @if (taskData.done === true) {
        <button type="button" class="btn btn-primary" (click)="statusChange(taskData.id)">Undo</button>
      } @else {
        <button type="button" class="btn btn-secondary" (click)="statusChange(taskData.id)">Done</button>
      }
    </section>
  `,
  styleUrl: './task.component.css'
})
export class TaskComponent {
  
  @Input() taskData!:ToDoTask;

  @Output() isDone = new EventEmitter<number>();
  
  statusChange(id: number){
    this.isDone.emit(id);
  }
}
