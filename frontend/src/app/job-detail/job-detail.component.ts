import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobdataserviceService } from '../jobdataservice.service';
import { AuthService } from '../auth-service.service';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: any;
  loading: boolean = false;

  constructor(
    private router: Router,
    private jobDataService: JobdataserviceService,
    private authService: AuthService,
    private jobService: JobService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.job = this.jobDataService.getJob();

    if (this.job) {
      console.log('Job details:', this.job);
    } else {
      console.error('No job data available');
      this.router.navigate(['/homecandidate']); // Redirect to home if no job data
    }
  }

  applyForJob(): void {
    const candidateId = this.authService.getLoggedInUserId();
    if (!candidateId) {
      this.snackBar.open('You must be logged in to apply for a job.', 'Close', {
        duration: 3000
      });
      return;
    }

    this.loading = true;
    this.jobService.applyToJob(this.job._id, candidateId).subscribe(
      response => {
        this.snackBar.open('Application submitted successfully', 'Close', {
          duration: 3000
        });
        this.loading = false;
      },
      error => {
        console.error('Error applying to job', error);
        this.snackBar.open('Error applying to job: ' + error.message, 'Close', {
          duration: 3000
        });
        this.loading = false;
      }
    );
  }
}
