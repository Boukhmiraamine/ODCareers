import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobOfferModalViewComponent } from '../job-offer-modal-view/job-offer-modal-view.component';
//import { JobOffer } from '../job-offer-modal-view/job-offer-modal-view.component';
import { AddJobOfferDialogComponent } from '../add-job-offer-dialog/add-job-offer-dialog.component';
import { ModifyJobOfferDialogComponent } from '../modify-job-offer-dialog/modify-job-offer-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface JobOffer {
  title: string;
  description: string;
  contractType: string;
  city: string;
  recruiter: string;
  domain: string;
  function: string;
  salary: number;
  educationLevel: string;
  publicationDate: Date;
  requiredSkills: string[];
  isApproved: boolean;
  location?: string; // Optional property
  companyLogo?: string; // Optional property
  companyName?: string; // Optional property
  companyDescription?: string; // Optional property
  // other fields...
}


@Component({
  selector: 'app-home-recruiter',
  templateUrl: './home-recruiter.component.html',
  styleUrls: ['./home-recruiter.component.css']
})
export class HomeRecruiterComponent {


  totalJobs = 100; // Total number of jobs, this should come from your backend
  pageSize = 10; // Default page size
  pageSizeOptions = [5, 10, 20];
  currentPage = 0;

  jobOffers: JobOffer[] = [
    {
      title: 'Frontend Developer',
      description: 'Responsible for implementing visual elements that users see and interact with in a web application.',
      contractType: 'Full-Time',
      city: 'New York, USA',
      recruiter: 'ObjectId("60d...")', // Assuming you have the ObjectId from MongoDB
      domain: 'Software Development',
      function: 'Development',
      salary: 85000,
      educationLevel: 'Bachelor\'s Degree in Computer Science',
      publicationDate: new Date('2024-01-01T00:00:00.000Z'),
      requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
      isApproved: true
    },
    {
      title: 'Backend Developer',
      description: 'Focus on server-side logic, integration of the user-facing element developed by front-end developers with server-side logic, and database management.',
      contractType: 'Permanent',
      city: 'San Francisco, USA',
      recruiter: 'ObjectId("60e...")', // Assuming you have the ObjectId from MongoDB
      domain: 'Software Development',
      function: 'Server Management',
      salary: 95000,
      educationLevel: 'Bachelor\'s Degree in Computer Science',
      publicationDate: new Date('2024-02-02T00:00:00.000Z'),
      requiredSkills: ['Node.js', 'Express', 'MongoDB', 'AWS'],
      isApproved: true
    },
    {
      title: 'Graphic Designer',
      description: 'Create visual concepts to communicate ideas that inspire, inform, and captivate consumers.',
      contractType: 'Freelance',
      city: 'Austin, Texas, USA',
      recruiter: 'ObjectId("60f...")', // Assuming you have the ObjectId from MongoDB
      domain: 'Graphic Design',
      function: 'Creative Design',
      salary: 45000,
      educationLevel: 'Bachelor\'s Degree in Graphic Design',
      publicationDate: new Date('2024-03-03T00:00:00.000Z'),
      requiredSkills: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Creativity'],
      isApproved: false
    }
  ];
  

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  openDialog(job: JobOffer): void {
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
        this.loadJobOffers(); // Refresh the list
        this.snackBar.open('Job offer added successfully', 'Close', { duration: 3000 });
      }
    });
  }

  openModifyDialog(job: JobOffer): void {
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
    // Assuming you have a service to handle HTTP requests
    // this.jobService.deleteJobOffer(jobId).subscribe({
    //   next: () => {
    //     this.loadJobOffers(); // Refresh the list
    //     this.snackBar.open('Job offer deleted successfully', 'Close', { duration: 3000 });
    //   },
    //   error: () => {
    //     this.snackBar.open('Failed to delete job offer', 'Close', { duration: 3000 });
    //   }
    // });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadJobOffers();
  }

  loadJobOffers(): void {
    // This method should call an API to fetch job offers based on current page and pageSize
    // Example:
    // this.jobService.getJobOffers(this.currentPage, this.pageSize).subscribe(data => {
    //   this.jobOffers = data.jobOffers;
    //   this.totalJobs = data.totalCount;
    // });
  }

}
