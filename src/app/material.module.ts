import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTabsModule } from '@angular/material/tabs'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from "@angular/material/core";



@NgModule({
  imports: [MatButtonModule,MatIconModule, MatSnackBarModule, MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDialogModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule,MatToolbarModule,MatListModule,MatTabsModule,MatCardModule,MatSelectModule,MatProgressSpinnerModule],
  exports: [MatButtonModule, MatIconModule, MatSnackBarModule, MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDialogModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule,MatToolbarModule,MatListModule,MatTabsModule,MatCardModule,MatSelectModule,MatProgressSpinnerModule]
})
export class MaterialModule {}
