import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-job-offer-dialog',
  templateUrl: './modify-job-offer-dialog.component.html',
  styleUrls: ['./modify-job-offer-dialog.component.css']
})
export class ModifyJobOfferDialogComponent {
  selectedJobOffer: any; // Placeholder for the selected job offer details
  selectedSkills: any = {};

  constructor(
    public dialogRef: MatDialogRef<ModifyJobOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Receive selected job offer data from parent component
    this.selectedJobOffer = data.jobOffer;
  }

  submitModifiedJobOffer(modifiedJobOffer: any): void {
    // Implement logic to submit modified job offer
    console.log(modifiedJobOffer);
    // Close the dialog after submission
    this.dialogRef.close();
  }

  closeDialog(): void {
    // Close the dialog without submitting changes
    this.dialogRef.close();
  }

}
