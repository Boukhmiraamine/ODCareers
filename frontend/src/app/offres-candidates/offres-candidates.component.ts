import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { ActivatedRoute } from '@angular/router';

export interface Candidate {
  id: string;
  fullName: string;
  position: string;
  profilePicture: string;
  email: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

@Component({
  selector: 'app-offres-candidates',
  templateUrl: './offres-candidates.component.html',
  styleUrls: ['./offres-candidates.component.css']
})
export class OffresCandidatesComponent implements OnInit {
  jobId: string = '';
  waitingCandidates: Candidate[] = [];
  acceptedCandidates: Candidate[] = [];
  refusedCandidates: Candidate[] = [];
  totalCandidates = 0;
  pageSize = 10;

  constructor(private jobService: JobService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('jobId') || '';
      if (this.jobId) {
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
      },
      error: (error: any) => {
        console.error('Error fetching applications:', error);
      }
    });
  }

  mapCandidate(app: any): Candidate {
    const profilePicture = app.candidate.profilePicture ? `/uploads/${app.candidate.profilePicture}` : '';
    return {
      id: app.candidate._id,
      fullName: app.candidate.fullName,
      position: app.candidate.position || '',
      profilePicture: profilePicture,
      email: app.candidate.email || '',
      status: app.status
    };
  }

  acceptCandidate(candidate: Candidate): void {
    this.jobService.updateApplicationStatus(this.jobId, candidate.id, 'Accepted').subscribe({
      next: () => {
        const message = `Your application for job ID ${this.jobId} has been accepted.`;
        const link = `/applications/${candidate.id}`; // This should be the appropriate link for your application
        const recipientType = 'Candidate'; // Assuming candidate is the recipient
        const senderId = 'recruiter-id'; // Replace with actual recruiter ID
        const senderType = 'Recruiter';

        this.jobService.sendNotification(candidate.id, message, recipientType, senderId, senderType, link).subscribe({
          next: () => {
            this.loadCandidates(); // Reload the candidates
          },
          error: (error: any) => {
            console.error('Error sending notification:', error);
          }
        });
      },
      error: (error: any) => {
        console.error('Error accepting candidate:', error);
      }
    });
  }

  refuseCandidate(candidate: Candidate): void {
    this.jobService.updateApplicationStatus(this.jobId, candidate.id, 'Rejected').subscribe({
      next: () => {
        const message = `Your application for job ID ${this.jobId} has been rejected.`;
        const link = `/applications/${candidate.id}`; // This should be the appropriate link for your application
        const recipientType = 'Candidate'; // Assuming candidate is the recipient
        const senderId = 'recruiter-id'; // Replace with actual recruiter ID
        const senderType = 'Recruiter';

        this.jobService.sendNotification(candidate.id, message, recipientType, senderId, senderType, link).subscribe({
          next: () => {
            this.loadCandidates(); // Reload the candidates
          },
          error: (error: any) => {
            console.error('Error sending notification:', error);
          }
        });
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

  onPageChange(): void {
    // Here you can call a service to fetch data for the corresponding page
    // This is typically done by sending the page and pageSize to your backend API
  }
}
