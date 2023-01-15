import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from './services/firebase.service';
import { NuovoProgettoComponent } from './projects/nuovo-progetto/nuovo-progetto.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { MaterialModule } from './material.module';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from "./navigation/header/header.component";
import { ProjectsComponent } from './projects/projects.component';
import { DeleteProjectDialogComponent } from './projects/delete-project-dialog/delete-project-dialog.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { AllTasksComponent } from './tasks/all-tasks/all-tasks.component';
import { DeleteTaskDialogComponent } from './tasks/delete-task-dialog/delete-task-dialog.component';
import { ProjectModule } from './projects/project.module';
import { TasksModule } from './tasks/tasks.module';

/* npm i --save @ngrrx/store */
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer'

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidenavListComponent,
        SignupComponent,
        LoginComponent,
        /* Inserito tramite projectModule
        NuovoProgettoComponent,
        ProjectsComponent,*/
        /*AddTaskComponent,*/
        DeleteProjectDialogComponent,
        /* Inserito tramite tasksModule
        TasksListComponent,
         AllTasksComponent, */
        DeleteTaskDialogComponent
    ],
    providers: [FirebaseService, AuthGuard],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        TasksModule,
        ProjectModule,
        MaterialModule,
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyB7rn36z3fNH9brZIrEHi_PMhr-Dk5KwPY",
            authDomain: "fir-angular-auth-5ada1.firebaseapp.com",
            projectId: "fir-angular-auth-5ada1",
            storageBucket: "fir-angular-auth-5ada1.appspot.com",
            messagingSenderId: "354796507198",
            appId: "1:354796507198:web:e1e35d4923be87210c816f"
        }),
        StoreModule.forRoot(reducers)
    ]
})
export class AppModule { }
