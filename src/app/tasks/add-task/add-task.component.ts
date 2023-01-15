import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Projects } from 'src/app/projects/projects-data-model';
import { ProjectsService } from 'src/app/projects/projects.service';
import { TasksService } from '../tasks.service';
import { Dipendenti } from '../task-data-model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, OnDestroy {


  projectsSubscription: Subscription;
  tasksSubscription: Subscription;
  currentProjectSubscription: Subscription;

  id: number
  currentProject: any = {
    name: '',
    available_hours: 0,
    tasks: []
  }

  dipendenti = Dipendenti;
  enumKeys = []

  constructor(private projectService: ProjectsService, private tasksService: TasksService, private router: ActivatedRoute) {
    this.id = this.router.snapshot.params['id'];
    this.enumKeys = Object.keys(this.dipendenti);
  }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe();
    //this.tasksSubscription.unsubscribe();
    this.currentProjectSubscription.unsubscribe();
  }

  reactiveform!: FormGroup;
  showMsg: boolean = false;
  allProjects: any

  ngOnInit(): void {

    // ###################################### SUBSCRIPTION PER TUTTI I PROGETTI ####################################
    this.projectsSubscription = this.projectService.projectsChanged.subscribe(project => {
      this.allProjects = project;
      this.setDefaultProject();
    });

    // ###################################### SUBSCRIPTION PER TUTTI I TASK ####################################
    /*this.tasksSubscription = this.tasksService.projectTasks.subscribe(result => {
      console.log(result);
    })*/

    // ###################################### SUBSCRIPTION PER PROGETTO CORRENTE ####################################
    this.currentProjectSubscription = this.tasksService.currentProjectSubject.subscribe(project => {
      this.currentProject = project
      this.reactiveform = new FormGroup({
        progetto : new FormControl(this.currentProject.id),
        nome: new FormControl(null),
        data: new FormControl(null),
        ore: new FormControl(null),
        dipendente: new FormControl(null),
        ticket: new FormControl(null),
        commento: new FormControl(null)
      })
    });

    // ###################################### LANCIO FUNZIONE PER RETRIEVE DI TUTTI I PROGETTI ####################################
    this.projectService.fetchAllProjects()

    // ###################################### INIZIALIZZAZIONE FORM ####################################
    this.reactiveform = new FormGroup({
      progetto: new FormControl(null),
      nome: new FormControl(null),
      data: new FormControl(null),
      ore: new FormControl(null),
      dipendente: new FormControl(null),
      ticket: new FormControl(null),
      commento: new FormControl(null)
    })


  }

  setDefaultProject(){
    this.tasksService.getCurrentProject(this.id)
  }

  handleChange(id){
    this.tasksService.getCurrentProject(id);
  }

  handleAdd(){
    let body = {
        name: this.reactiveform.value.nome,
        date: this.reactiveform.value.data,
        hours: this.reactiveform.value.ore,
        ticket: this.reactiveform.value.ticket,
        comment: this.reactiveform.value.commento,
        employer: this.reactiveform.value.dipendente
    }

    this.tasksService.addTaskToProject(body)

    //this.tasksService.fetchTasksByProject(this.reactiveform.value.progetto);

    //this.tasksService.fetchTasksByProject2(this.reactiveform.value.progetto);

  }



}
