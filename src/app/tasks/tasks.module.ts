import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';


@NgModule({
  declarations: [
    AddTaskComponent,
    AllTasksComponent,
    TasksListComponent
  ],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class TasksModule { }
