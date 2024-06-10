import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobService } from '../job.service';

export interface JobOffer {
  id?: string;
  title: string;
  city: string;
  companyName: string;
  companyDescription: string;
  shortDescription: string;
  publicationStart: string;
  publicationEnd: string;
  positionsAvailable: string;
  responsibilities?: string[];
  requirements?: string[];
  candidateCount?: number;
}

@Component({
  selector: 'app-job-offer-modal-view',
  templateUrl: './job-offer-modal-view.component.html',
  styleUrls: ['./job-offer-modal-view.component.css']
})
export class JobOfferModalViewComponent implements OnInit {
  applicationsCount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<JobOfferModalViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { job: JobOffer },
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loadApplicationsCount();
  }

  loadApplicationsCount(): void {
    if (this.data.job.id) {
      this.jobService.getApplicationsByJob(this.data.job.id).subscribe({
        next: (response) => {
          this.applicationsCount = response.applications.length;
        },
        error: (error) => {
          console.error('Error fetching applications:', error);
        }
      });
    }
  }
}
