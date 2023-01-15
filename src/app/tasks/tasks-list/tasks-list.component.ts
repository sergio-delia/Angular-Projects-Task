import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Projects } from 'src/app/projects/projects-data-model';
import { TasksService } from '../tasks.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit, OnDestroy {

  id: string;
  currentProject: Projects
  currentProjectSubscription: Subscription
  routeSubscription: Subscription
  currentTasks: any = [];
  displayedColumns: string[] = ['project', 'name', 'hours', 'date', 'employer', 'comment', 'Azioni'];
  dataSource = new MatTableDataSource<Task>()
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route:ActivatedRoute, private tasksService: TasksService, private dialog: MatDialog) {

    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.tasksService.getCurrentProject(this.id);
    });


  }


  ngOnInit(): void {

    this.currentProjectSubscription = this.tasksService.currentProjectSubject.subscribe((project) => {
      this.currentProject = project
      this.currentTasks = []
        if(this.currentProject.tasks){
          this.currentProject.tasks.forEach((valore, key) => {
            this.currentTasks.push({...valore, project:project.name, chiave: key})
          })
        }
      this.dataSource.data = this.currentTasks
    })
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
}


  ngOnDestroy(): void {
    this.currentProjectSubscription.unsubscribe();
  }


  handleDelete(chiave: any){
    console.log(chiave);
    this.openDialog(this.currentProject, chiave);
  }

  openDialog(progetto, chiave) {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, { data: {progetto: progetto, chiave: chiave} });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.tasksService.deleteTaskFromProject(this.currentProject, chiave);
      }
    });
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
