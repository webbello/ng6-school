import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'; 

@NgModule({
  imports: [
    CommonModule,
    MatBadgeModule,
    MatExpansionModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTreeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  exports: [
    MatBadgeModule,
    MatExpansionModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTreeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  declarations: []
})
export class MaterialModule { }
