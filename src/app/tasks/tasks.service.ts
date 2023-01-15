import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject, Subscription, take } from 'rxjs';
import { Projects } from '../projects/projects-data-model';
import { Dipendenti, Task } from './task-data-model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private db: AngularFirestore, private snackbar: MatSnackBar, private router: Router) { }

  projectTasks = new Subject<Task[]>();
  currentProjectSubject = new Subject<Projects>();
  currentProject: any;
  tasksSubscription: Subscription[] = [];
  /*
  fetchTasksByProject2(projectId: string){
    this.db.collection('projects').doc(projectId).get().subscribe((result) => {
      let tasks: any = result.data();
      this.projectTasks.next({...tasks.tasks});
    })
  }
*/

  fetchTasksByProject(projectId: string) {
    this.tasksSubscription.push( this.db.collection('projects').doc(projectId).valueChanges().pipe(take(1)).subscribe((result: any) => {
          let tasks = result.tasks;
          this.projectTasks.next({ ...tasks });
        })
    );
  }

  getCurrentProject(id) {
    this.tasksSubscription.push(
      this.db.collection('projects').doc(id).snapshotChanges().pipe(map((doc) => {
            const data: any = doc.payload.data();
            return {
              //...doc.payload.data() as {},
              id: doc.payload.id,
              name: data.name,
              available_hours: data.available_hours,
              tasks: data.tasks,
            };
          })
        ).subscribe((project: any) => {
          this.currentProject = project;
          if(!this.currentProject.tasks){
            this.currentProject.tasks = [];
          }
          this.currentProjectSubject.next({ ...this.currentProject });
        })
    );
  }

  addTaskToProject(body: Task) {
    let hours_remained = this.currentProject.available_hours - body.hours
    if(hours_remained >= 0){
      this.currentProject.tasks.push(body);
      this.db.collection('projects').doc(this.currentProject.id).update({available_hours: hours_remained,tasks: this.currentProject.tasks}).then(() => {
        this.snackbar.open('Task aggiunto correttamente', null, {duration: 3000});
        this.router.navigate(['/dashboard']);
      }).catch((error) => {
        console.log(error);
      })
    } else {
      this.snackbar.open('Il task richiede più tempo di quello rimasto a disposizione per il progetto', null, {duration: 3000});
    }
    // this.tasksSubscription.push(this.db.collection('projects').doc(body.progetto).)
  }

  deleteTaskFromProject(progetto, key){
    console.log(progetto);
    let project: Projects = {
      name: progetto.name,
      available_hours: progetto.available_hours,
      tasks: progetto.tasks
    }

    let tasks = []
    let removedTask: any = {}
    progetto.tasks.map((valore, chiave) => {
      if(chiave != key){
        tasks.push(valore)
        } else {
          removedTask = valore
        }
    })

    this.db.collection('projects').doc(progetto.id).update(
      {...project, available_hours: project.available_hours + removedTask.hours, tasks: tasks}
    ).catch(error => {
      console.log(error);
    })
  }


}
