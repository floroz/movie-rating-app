import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Movie } from '@movie-rating-app/api-interfaces';

@Component({
  selector: 'movie-rating-app-rating-dialog',
  template: `
    <h1 mat-dialog-title>Change rating of {{ data.title }}</h1>
    <div mat-dialog-content>
      <p>Current rating: {{ data.rating.score }}</p>
      <mat-form-field appearance="fill">
        <mat-label>Select</mat-label>
        <mat-select [(value)]="selectedValue">
          <mat-option *ngFor="let num of ratings" [value]="num">{{
            num
          }}</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="button-group">
      <button
        mat-raised-button
        color="basic"
        (click)="onNoClick()"
        cdkFocusInitial
      >
        Cancel
      </button>
      <button mat-raised-button color="primary" (click)="onYesClick()">
        Confirm
      </button>
    </div>
  `,
})
export class RatingDialogComponent {
  selectedValue: string;

  ratings = Array.from(Array(11).keys());

  constructor(
    public dialogRef: MatDialogRef<RatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onYesClick() {
    this.dialogRef.close(this.selectedValue);
  }
}
