import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { JobService } from '../job.service';

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
  loading: Job | null = null;
  mobileFiltersOpen = false;
  sortMenuOpen = false;
  colorFiltersOpen = false;
  categoryFiltersOpen = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(
      (jobs: any) => {
        this.jobs = jobs.map((job: any) => ({
          ...job,
          expanded: false,
          showMatchingSkills: false
        }));
      },
      error => {
        console.error('Error fetching jobs', error);
      }
    );
  }

  toggleExpand(job: Job) {
    job.expanded = !job.expanded;
  }

  showMatchingSkills(job: Job) {
    this.loading = job;
    setTimeout(() => {
      this.loading = null;
      job.showMatchingSkills = true;
    }, 2000);
  }

  applyForJob(job: Job) {
    this.router.navigate(['/job-detail'], { state: { job } });
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
    console.log(`Sorting by ${criteria}`);
    this.sortMenuOpen = false;
  }

  toggleGridView() {
    console.log('Toggling grid view');
  }
}
