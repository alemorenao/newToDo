import { Component, inject } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { FormComponent } from '../form/form.component';
import { ToDoTask } from '../../interfaces/to-do-task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ TaskComponent, FormComponent, FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  
  taskList! : ToDoTask[];
  selectedOption: string = "To Do"
  
  constructor(){
    if (sessionStorage.length == 0) {
      this.taskList = [];
    } else {
      this.taskList = JSON.parse(sessionStorage.getItem("taskList")!)
    }
  }

  addTaskToList(newTask: ToDoTask){
    
    this.taskList.push(newTask);
    sessionStorage.setItem("taskList", JSON.stringify(this.taskList));
    sessionStorage.setItem("numberOfTasks", JSON.stringify(this.taskList.length));
    
  }

  statusChange(id: number){
    this.taskList[id].done = !this.taskList[id].done;
    sessionStorage.setItem("taskList", JSON.stringify(this.taskList));
    
  }

  tasksToShow(filter: string): ToDoTask[] | undefined{
    switch (filter) {
      case "All":
        return this.taskList
        break;

      case "Done":
        return this.taskList.filter(task => task.done === true)
        break;
      default:

        return this.taskList.filter(task => task.done === false)
        break;
    }
  }
}
