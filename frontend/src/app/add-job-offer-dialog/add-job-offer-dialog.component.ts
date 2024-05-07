import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-add-job-offer-dialog',
  templateUrl: './add-job-offer-dialog.component.html',
  styleUrls: ['./add-job-offer-dialog.component.css']
})
export class AddJobOfferDialogComponent implements OnInit {
    skills: string[] = ['Programming', 'Design', 'Management', 'Communication', 'Problem Solving'];
    selectedSkills: { [key: string]: boolean } = {};
  
    constructor(
      public dialogRef: MatDialogRef<AddJobOfferDialogComponent>,
      private authService: AuthService // Inject JobService
    ) { }
  
    ngOnInit(): void {
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }
  
    submitJobOffer(jobOfferForm: NgForm): void {
      if (jobOfferForm.valid) {
        const formData = jobOfferForm.value;
        const selectedSkillsArray = Object.keys(this.selectedSkills).filter(skill => this.selectedSkills[skill]);
        formData.requiredSkills = selectedSkillsArray;
        this.authService.addJob(formData).subscribe({
          next: (response) => {
            console.log('Job added successfully', response);
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Failed to add job', error);
          }
        });
      }
    }
}
