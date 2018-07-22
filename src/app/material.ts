import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTreeModule, MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule} from '@angular/material';

@NgModule({

  imports: [
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  declarations: []
})
export class MaterialModule { }
