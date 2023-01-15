import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { NuovoProgettoComponent } from './nuovo-progetto/nuovo-progetto.component';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { TasksModule } from '../tasks/tasks.module';

@NgModule({
  declarations: [
    ProjectsComponent,
    NuovoProgettoComponent
  ],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TasksModule
  ]
})
export class ProjectModule { }
