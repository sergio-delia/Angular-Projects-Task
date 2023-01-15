import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Projects } from './projects-data-model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromProjects from './projects.reducer';
import * as PROJECTS from './projects.action';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private fsSubs: Subscription[] = [];
  private availableProjects : Projects[];
  projectChanged = new Subject<Projects>();
  projectsChanged = new Subject<Projects[]>();

  constructor(private store:Store<fromProjects.State>, private db: AngularFirestore, private snackbar: MatSnackBar, private router: Router) { }

  fetchAllProjects(){

    this.store.dispatch(new PROJECTS.StopLoading)
    this.store.dispatch(new PROJECTS.StartLoading);

      this.db.collection('projects').snapshotChanges().pipe(map(docArray => {
        return docArray.map(doc => {
          const data : any = doc.payload.doc.data();
          return {
            //...doc.payload.doc.data() as {},
            id: doc.payload.doc.id,
            name: data.name,
            available_hours: data.available_hours,
            tasks: data.tasks
          }
        })
      })).subscribe((projects: any[]) => {
        this.availableProjects = projects
        this.projectsChanged.next([...this.availableProjects])
      }, error => {
        this.snackbar.open('Fetching Projects failed, please try again later', null, {duration:3000})
        console.log(error);
        this.projectsChanged.next(null);
      })

  }


  getAvailableProjects(){
    return this.availableProjects.slice();
  }

  addProject(body: Projects){
    this.db.collection('projects').add(body).then(() => {
      console.log('Aggiunto');
    }).catch(error => {
      console.log(error.message);
    })
  }

  updateProject(body: Projects, id: string){
    var taskCount: number = 0;
    body.tasks.forEach((task: any) =>{
      taskCount += task.hours
    });
    if(body.available_hours >= taskCount){
      this.db.collection('projects').doc(id).update({
        name: body.name,
        available_hours: body.available_hours,
        tasks: body.tasks
      } );
      this.snackbar.open('Aggiornamento eseguito', null, {duration:3000})
      this.router.navigate(['/dashboard']);
    } else {
      this.snackbar.open(`Le ore non possono essere inferiore al totale delle ore utilizzate per i task. Si prega di inserire almeno ${taskCount}`, null, {duration:3000})
    }
  }

  deleteProject(id: string){
    this.db.collection('projects').doc(id).delete().then(() =>{
      this.snackbar.open(`Progetto eliminato correttamente`, null, {duration:3000})
    }).catch((error) =>{
      this.snackbar.open(`Errore durante la cancellazione: ${error.message}`, null, {duration:3000})
    })
  }

}
