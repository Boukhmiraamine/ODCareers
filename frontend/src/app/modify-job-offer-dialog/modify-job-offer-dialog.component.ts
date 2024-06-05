import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobService } from '../job.service';

@Component({
  selector: 'app-modify-job-offer-dialog',
  templateUrl: './modify-job-offer-dialog.component.html',
  styleUrls: ['./modify-job-offer-dialog.component.css']
})
export class ModifyJobOfferDialogComponent {
  selectedJobOffer: any; // Placeholder for the selected job offer details

  constructor(
    public dialogRef: MatDialogRef<ModifyJobOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jobService: JobService
  ) {
    this.selectedJobOffer = data.job;
  }

  submitModifiedJobOffer(): void {
    this.jobService.updateJob(this.selectedJobOffer._id, this.selectedJobOffer).subscribe(
      response => {
        console.log('Job updated successfully', response);
        this.dialogRef.close('updated');
      },
      error => {
        console.error('Error updating job', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
