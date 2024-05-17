// job-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.job = navigation?.extras?.state?.['job'] ?? null;

    if (this.job) {
      console.log('Job details:', this.job);
    } else {
      console.error('No job data available');
    }
  }
}
