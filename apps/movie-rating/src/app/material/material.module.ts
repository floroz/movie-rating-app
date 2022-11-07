import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  exports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class MaterialModule {}
