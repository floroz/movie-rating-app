import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'movie-rating-app-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>{{ data.subTitle }}</div>
    <div mat-dialog-actions class="button-group">
      <button
        mat-raised-button
        color="accent"
        (click)="onNoClick()"
        cdkFocusInitial
      >
        No
      </button>
      <button mat-raised-button color="primary" (click)="onYesClick()">
        Yes
      </button>
    </div>
  `,
  styles: [
    `
      .button-group {
        padding: 2rem 0;
      }

      button:first-of-type {
        margin-right: 1rem;
      }
    `,
  ],
})
export class ConfirmationDialogComponent<
  T,
  D extends { title: string; subTitle?: string }
> {
  constructor(
    public dialogRef: MatDialogRef<T>,
    @Inject(MAT_DIALOG_DATA) public data: D
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
