import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { JobService } from '../job.service';
import { PageEvent } from '@angular/material/paginator';
import { JobdataserviceService } from '../jobdataservice.service';

interface Job {
  _id: string;
  title: string;
  description: string;
  contractType: string;
  city: string;
  recruiter: {
    _id: string;
    companyName: string;
    companyLogo: string; // Add companyLogo field
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
  expanded: boolean;
}

@Component({
  selector: 'app-homecandidate',
  templateUrl: './homecandidate.component.html',
  styleUrls: ['./homecandidate.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', [
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class HomecandidateComponent implements OnInit {
  jobs: Job[] = [];
  pagedJobs: Job[] = [];
  mobileFiltersOpen = false;
  sortMenuOpen = false;
  colorFiltersOpen = true;
  categoryFiltersOpen = true;
  pageSize = 10;
  currentPage = 0;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private jobService: JobService,
    private jobDataService: JobdataserviceService
  ) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(
      (jobs: any) => {
        this.jobs = jobs.map((job: any) => ({
          ...job,
          expanded: false,
        }));
        this.updatePagedJobs();
      },
      error => {
        console.error('Error fetching jobs', error);
      }
    );
  }

  toggleExpand(job: Job) {
    job.expanded = !job.expanded;
  }

  applyForJob(job: Job) {
    this.jobDataService.setJob(job);
    this.router.navigate(['/job-detail']);
  }

  toggleMobileFilters() {
    this.mobileFiltersOpen = !this.mobileFiltersOpen;
  }

  toggleSortMenu() {
    this.sortMenuOpen = !this.sortMenuOpen;
  }

  toggleColorFilters() {
    this.colorFiltersOpen = !this.colorFiltersOpen;
  }

  toggleCategoryFilters() {
    this.categoryFiltersOpen = !this.categoryFiltersOpen;
  }

  sortBy(criteria: string) {
    this.sortMenuOpen = false;
    switch (criteria) {
      case 'newest':
        this.jobs.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
        break;
      case 'oldest':
        this.jobs.sort((a, b) => new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime());
        break;
      case 'salaryHighLow':
        this.jobs.sort((a, b) => b.salary - a.salary);
        break;
      case 'salaryLowHigh':
        this.jobs.sort((a, b) => a.salary - b.salary);
        break;
    }
    this.updatePagedJobs();
  }

  toggleGridView() {
    console.log('Toggling grid view');
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedJobs();
  }

  private updatePagedJobs() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedJobs = this.jobs.slice(startIndex, endIndex);
  }
}
