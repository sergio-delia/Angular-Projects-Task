import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { Projects } from './projects-data-model';
import { ProjectsService } from './projects.service';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DeleteProjectDialogComponent } from './delete-project-dialog/delete-project-dialog.component';

import { Store } from '@ngrx/store';
import * as fromProjects from '../app.reducer'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projectSubscription: Subscription;
  projects: Projects[];
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Projects>()

  constructor(private store:Store<fromProjects.State>, private db: AngularFirestore, private projectsService: ProjectsService, public dialog: MatDialog) { }

  displayedColumns: string[] = ['name', 'available_hours', 'edit', 'add-tasks'];

  ongoingTraining$ : Observable<boolean>


  ngOnInit(): void {
    this.projectSubscription = this.projectsService.projectsChanged.subscribe(project => {
      this.projects = project;
      this.dataSource.data = this.projects
    });

    this.projectsService.fetchAllProjects();

    this.ongoingTraining$ = this.store.select(fromProjects.getIsLoading);
    this.ongoingTraining$.subscribe(test => console.log(test)
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
}


  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleDelete(id){
    console.log(id);
    let progetto = this.projects.find((project: any) => {
      return project.id == id
    })
    this.openDialog(progetto);
  }

  openDialog(progetto) {
    const dialogRef = this.dialog.open(DeleteProjectDialogComponent, { data: {progetto: progetto} });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.projectsService.deleteProject(progetto.id);
      }
    });
  }


  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }


}
