import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatBadgeModule, MatExpansionModule, MatTabsModule, MatSelectModule, MatDialog, MatTreeModule, MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatFormFieldModule} from '@angular/material';

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
    MatFormFieldModule
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
    MatFormFieldModule
  ],
  declarations: [],
  providers: [
    MatDialog
  ]
})
export class MaterialModule { }
