import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Projects } from 'src/app/projects/projects-data-model';
import { ProjectsService } from 'src/app/projects/projects.service';
import { Task } from '../task-data-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { TasksService } from '../tasks.service';



@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit, OnDestroy, AfterViewInit {

  projectSubscription: Subscription
  allProject: any;
  dataSource = new MatTableDataSource<Task>()
  allTasks: any = []
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private projectsService: ProjectsService, private dialog: MatDialog, private tasksService: TasksService) { }


  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
  }


  displayedColumns: string[] = ['project', 'name', 'hours', 'date', 'employer', 'comment', 'Azioni'];

  ngOnInit(): void {
    this.projectSubscription = this.projectsService.projectsChanged.subscribe(projects => {
      this.allProject = projects;
      this.allTasks = []
      projects.map((project:any) => {
        if(project.tasks){

          project.tasks.forEach((valore, key) => {
            this.allTasks.push({...valore, project:project.name, id: project.id, chiave: key})
          })
        }
      })
      this.dataSource.data = this.allTasks
    })

    this.projectsService.fetchAllProjects();
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  handleDelete(id, chiave){
    console.log(id);
    console.log(chiave);

    let progetto = this.allProject.find((project: any) => {
      return project.id == id
    })
    this.openDialog(progetto, chiave);
  }

  openDialog(progetto, chiave) {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, { data: {progetto: progetto, chiave: chiave} });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.tasksService.deleteTaskFromProject(progetto, chiave)
      }
    });
  }


  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }


}
