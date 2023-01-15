import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Projects } from '../projects-data-model';
import { switchMap } from 'rxjs';
import { ProjectsService } from '../projects.service';
import { Task } from 'src/app/tasks/task-data-model';

@Component({
  selector: 'app-nuovo-progetto',
  templateUrl: './nuovo-progetto.component.html',
  styleUrls: ['./nuovo-progetto.component.css']
})
export class NuovoProgettoComponent implements OnInit {

  showMsg: boolean = false;
  id: string | null = null;
  nome: string | null = null;
  ore: number | null = null;
  tasks: Task[] = null

  constructor(private route: ActivatedRoute, private db:AngularFirestore ,public firebaseService: FirebaseService, private snackbar: MatSnackBar, private projectService: ProjectsService) {

    this.id = this.route.snapshot.params["id"] ?? null

   }

  reactiveform!: FormGroup;

  ngOnInit(): void {

    this.startForm();
    if(this.id){
      this.editForm();
    }

    //Check if ID
/*
    this.route.firstChild.params.subscribe(params => {
  this.id = params['id'];
   this.editForm();
});
*/



  }

  editForm(){
    console.log(this.id)
    this.db.collection('projects').doc(this.id).valueChanges().subscribe( (result : Projects) => {
      console.log(result);
      this.nome = result.name;
      this.ore = result.available_hours
      this.tasks = result.tasks || []
      this.startForm();
    }, error => {
      this.snackbar.open('Impossibile trovare progetto con id ' + this.id, null, {duration: 3000})
    })
  }

  startForm(){
    this.reactiveform = new FormGroup({
      nome: new FormControl(this.nome, [Validators.required]),
      ore: new FormControl(this.ore, [Validators.required, Validators.min(1)]),
    })
  }

  handleAdd(){
    var body = {
      name: this.reactiveform.value.nome,
      available_hours: this.reactiveform.value.ore,
      //tasks: [{name: 'Cambio 1', hours: 3}, {name: "cambio 2", hours: 2}]
      tasks: this.tasks,
    }

    if(this.id){
      //Array.prototype.push.call(body.tasks,{name: "Hola", "hours": 14});
      //body.tasks.push({name: "Hola", "hours": 14})
      this.projectService.updateProject(body, this.id);
    } else {
      this.projectService.addProject(body)
    }

    /*
    this.db.collection('projects').doc('ccKoj9law2mCDW7eK3vY').get().subscribe(doc =>{
      let test: any = doc.data();
      test.tasks.map(t => console.log(t))
    });
    */



  }


}
