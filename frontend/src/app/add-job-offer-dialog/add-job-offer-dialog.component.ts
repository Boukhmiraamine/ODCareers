import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth-service.service';
import { JobService } from '../job.service';

@Component({
  selector: 'app-add-job-offer-dialog',
  templateUrl: './add-job-offer-dialog.component.html',
  styleUrls: ['./add-job-offer-dialog.component.css']
})
export class AddJobOfferDialogComponent implements OnInit {
  @ViewChild('jobOfferForm') jobOfferForm!: NgForm;
  skills: string[] = ['Programming', 'Design', 'Management', 'Communication', 'Problem Solving'];
  selectedSkills: { [key: string]: boolean } = {};
  loggedInRecruiterId: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddJobOfferDialogComponent>,
    private jobService: JobService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInRecruiterId = this.authService.getLoggedInUserId();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitJobOffer(formData: any): void {
    if (!this.jobOfferForm.valid) {
      this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
      return;
    }

    if (!this.loggedInRecruiterId) {
      this.snackBar.open('No recruiter logged in.', 'Close', { duration: 3000 });
      return;
    }

    formData.publicationDate = new Date();
    formData.recruiter = this.loggedInRecruiterId;
    formData.requiredSkills = Object.keys(this.selectedSkills).filter(skill => this.selectedSkills[skill]);

    this.jobService.createJob(formData).subscribe({
      next: (response) => {
        this.snackBar.open('Job offer added successfully', 'Close', { duration: 4000 });
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Failed to add job', error);
        this.snackBar.open('Failed to add job', 'Close', { duration: 3000 });
      },
      complete: () => {
        this.jobOfferForm.resetForm();
        this.selectedSkills = {};
      }
    });
  }
}
