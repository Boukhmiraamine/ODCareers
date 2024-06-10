import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Import Router
import { JobService } from '../job.service';
import { AuthService } from '../auth-service.service';
import { JobOfferModalViewComponent } from '../job-offer-modal-view/job-offer-modal-view.component';
import { AddJobOfferDialogComponent } from '../add-job-offer-dialog/add-job-offer-dialog.component';
import { ModifyJobOfferDialogComponent } from '../modify-job-offer-dialog/modify-job-offer-dialog.component';

interface Job {
  _id: string;
  title: string;
  description: string;
  contractType: string;
  city: string;
  recruiter: {
    _id: string;
    companyName: string;
  };
  domain: string;
  function: string;
  salary: number;
  educationLevel: string;
  publicationDate: Date;
  requiredSkills: string[];
  isApproved: boolean;
  applications: Array<{
    _id: string;
    candidate: string;
  }>;
  matchScore: number;
  expanded: boolean;
  showMatchingSkills: boolean;
}

@Component({
  selector: 'app-home-recruiter',
  templateUrl: './home-recruiter.component.html',
  styleUrls: ['./home-recruiter.component.css']
})
export class HomeRecruiterComponent implements OnInit {
  totalJobs = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20];
  currentPage = 0;
  recruiterId: string | null = null;

  jobOffers: Job[] = [];
  dropdowns: { sort: boolean; filters: boolean } = {
    sort: false,
    filters: false
  };

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private jobService: JobService,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.loadJobOffers();
  }

  loadJobOffers(): void {
    this.recruiterId = this.authService.getLoggedInUserId();
    if (this.recruiterId) {
      this.jobService.getJobsByRecruiter(this.recruiterId).subscribe(
        response => {
          if (response && response.jobs) {
            console.log("Jobs loaded:", response.jobs);
            this.jobOffers = response.jobs.map((job: Job) => ({
              ...job,
              expanded: false,
              showMatchingSkills: false
            }));
            this.totalJobs = response.totalJobs;
          } else {
            console.error("Invalid response structure", response);
          }
        },
        error => {
          console.error('Error fetching jobs:', error);
        }
      );
    }
  }

  openDialog(job: Job): void {
    this.dialog.open(JobOfferModalViewComponent, {
      width: '500px',
      data: { job }
    });
  }

  openAddJobOfferDialog(): void {
    const dialogRef = this.dialog.open(AddJobOfferDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.loadJobOffers();
        this.snackBar.open('Job offer added successfully', 'Close', { duration: 3000 });
      }
    });
  }

  openModifyDialog(job: any): void {
    const dialogRef = this.dialog.open(ModifyJobOfferDialogComponent, {
      width: '600px',
      data: { job }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadJobOffers(); // Refresh the list
        this.snackBar.open('Job offer updated successfully', 'Close', { duration: 3000 });
      }
    });
  }

  deleteJobOffer(jobId: string): void {
    this.jobService.deleteJob(jobId).subscribe({
      next: () => {
        this.loadJobOffers();
        this.snackBar.open('Job offer deleted successfully', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to delete job offer', 'Close', { duration: 3000 });
      }
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadJobOffers();
  }

  toggleDropdown(type: 'sort' | 'filters'): void {
    this.dropdowns[type] = !this.dropdowns[type];
  }

  // New method to navigate to the OffresCandidatesComponent
  viewCandidates(jobId: string): void {
    this.router.navigate(['/jobs', jobId, 'applications']);
  }
}
