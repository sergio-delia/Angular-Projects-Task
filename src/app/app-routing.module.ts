import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NuovoProgettoComponent } from './projects/nuovo-progetto/nuovo-progetto.component';
import { ProjectsComponent } from './projects/projects.component';
import { AllTasksComponent } from './tasks/all-tasks/all-tasks.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';

const routes: Routes = [
  {path:'dashboard', component: ProjectsComponent, canActivate: [AuthGuard], children: [
    {path:':id', component:TasksListComponent}
  ]},
  {path:'add-project', component: NuovoProgettoComponent, canActivate: [AuthGuard] },
  {path:'add-project/:id',   component: NuovoProgettoComponent },
  {path:'add-tasks/:id',   component: AddTaskComponent },
  {path:'add-tasks', component: AddTaskComponent, canActivate: [AuthGuard]},
  {path:'tasks', component: AllTasksComponent, canActivate: [AuthGuard]},
  {path:'signup', component: SignupComponent},
  {path:'login', component: LoginComponent},
  {path:'', redirectTo: 'dashboard', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
