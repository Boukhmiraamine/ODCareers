// apply-confirmation-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-apply-confirmation-dialog',
  templateUrl: './apply-confirmation-dialog.component.html',
  styleUrls: ['./apply-confirmation-dialog.component.css']
})
export class ApplyConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ApplyConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
