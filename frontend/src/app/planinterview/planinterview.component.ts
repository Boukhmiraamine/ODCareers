import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { AuthService } from '../auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-plan-interview',
  templateUrl: './planinterview.component.html',
  styleUrls: ['./planinterview.component.css']
})
export class PlanInterviewComponent implements OnInit {
  candidateId: string = '';
  interviewForm: FormGroup;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['candidate', 'date', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.interviewForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.candidateId = params.get('candidateId') || '';
      this.fetchScheduledInterviews();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  scheduleInterview(): void {
    if (this.interviewForm.invalid) {
      return;
    }

    const date = this.interviewForm.value.date;
    const time = this.interviewForm.value.time;
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const scheduledDate = new Date(`${dateString}T${time}:00.000Z`);

    if (isNaN(scheduledDate.getTime())) {
      console.error('Invalid Scheduled Date:', scheduledDate);
      return;
    }

    const recruiterId = this.authService.getLoggedInUserId();

    if (!recruiterId) {
      console.error('Recruiter ID is null');
      return;
    }

    console.log("Form Value:", this.interviewForm.value);
    console.log("Scheduled Date:", scheduledDate);

    this.jobService.scheduleInterview(this.candidateId, recruiterId, scheduledDate).subscribe({
      next: (response) => {
        alert('Interview scheduled successfully');
        this.fetchScheduledInterviews(); // Fetch the updated list of scheduled interviews
        this.router.navigate(['/offres-candidates']);
      },
      error: (error) => {
        console.error('Error scheduling interview:', error);
      }
    });
  }

  fetchScheduledInterviews(): void {
    const recruiterId = this.authService.getLoggedInUserId();
    if (recruiterId) {
      this.jobService.getScheduledInterviews(recruiterId).subscribe({
        next: (interviews) => {
          this.dataSource.data = interviews;
        },
        error: (error) => {
          console.error('Error fetching scheduled interviews:', error);
        }
      });
    }
  }

  joinVideoCall(interview: any): void {
    this.router.navigate(['/video-call', interview._id]);
  }
}
