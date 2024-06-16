import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { AuthService } from '../auth-service.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface Candidate {
  id: string;
  fullName: string;
  position: string;
  profilePicture: string;
  email: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  requiredSkills: string[];
  showMatchingSkills: boolean;
}

@Component({
  selector: 'app-offres-candidates',
  templateUrl: './offres-candidates.component.html',
  styleUrls: ['./offres-candidates.component.css'],
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
export class OffresCandidatesComponent implements OnInit {
  jobId: string = '';
  recruiterId: string | null = null;
  waitingCandidates: Candidate[] = [];
  acceptedCandidates: Candidate[] = [];
  refusedCandidates: Candidate[] = [];
  totalCandidates = 0;
  pageSize = 10;
  isLoading = true;
  loading: Candidate | null = null;

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router // Add Router here
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('jobId') || '';
      if (this.jobId) {
        this.recruiterId = this.authService.getLoggedInUserId();
        this.loadCandidates();
      } else {
        console.error('No jobId found in route parameters.');
      }
    });
  }

  loadCandidates(): void {
    if (!this.jobId) {
      console.error('Cannot load candidates, jobId is not defined');
      return;
    }

    this.jobService.getApplicationsByJob(this.jobId).subscribe({
      next: (response) => {
        this.totalCandidates = response.applications.length;
        this.waitingCandidates = response.applications.filter((app: any) => app.status === 'Pending').map(this.mapCandidate);
        this.acceptedCandidates = response.applications.filter((app: any) => app.status === 'Accepted').map(this.mapCandidate);
        this.refusedCandidates = response.applications.filter((app: any) => app.status === 'Rejected').map(this.mapCandidate);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching applications:', error);
        this.isLoading = false;
      }
    });
  }

  mapCandidate(app: any): Candidate {
    const profilePicture = app.candidate.profilePicture ? `http://localhost:3000/${app.candidate.profilePicture}` : '';
    return {
      id: app.candidate._id,
      fullName: app.candidate.fullName,
      position: app.candidate.position || '',
      profilePicture: profilePicture,
      email: app.candidate.email || '',
      status: app.status,
      requiredSkills: app.candidate.skills || [],
      showMatchingSkills: false
    };
  }

  acceptCandidate(candidate: Candidate): void {
    if (!this.recruiterId) {
      console.error('Recruiter ID is not available.');
      return;
    }

    this.jobService.updateApplicationStatus(this.jobId, candidate.id, 'Accepted').subscribe({
      next: () => {
        this.loadCandidates(); // Reload the candidates
      },
      error: (error: any) => {
        console.error('Error accepting candidate:', error);
      }
    });
  }

  refuseCandidate(candidate: Candidate): void {
    if (!this.recruiterId) {
      console.error('Recruiter ID is not available.');
      return;
    }

    this.jobService.updateApplicationStatus(this.jobId, candidate.id, 'Rejected').subscribe({
      next: () => {
        this.loadCandidates(); // Reload the candidates
      },
      error: (error: any) => {
        console.error('Error refusing candidate:', error);
      }
    });
  }

  viewProfile(candidate: Candidate) {
    console.log('Viewing profile:', candidate);
    // Placeholder for profile viewing logic
  }

  showMatchingSkills(candidate: Candidate) {
    this.loading = candidate;
    setTimeout(() => {
      this.loading = null;
      candidate.showMatchingSkills = true;
    }, 2000);
  }

  getMatchScore(skills: string[]): number {
    // Replace with actual match score calculation logic
    return Math.floor(Math.random() * 101); // Placeholder random score between 0 and 100
  }

  onPageChange(): void {
    // Here you can call a service to fetch data for the corresponding page
    // This is typically done by sending the page and pageSize to your backend API
  }

  planInterview(candidate: Candidate): void {
    this.router.navigate(['/plan-interview', candidate.id]); // Navigate to the plan-interview component
  }
}
