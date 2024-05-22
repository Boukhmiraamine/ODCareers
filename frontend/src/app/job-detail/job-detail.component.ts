import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobdataserviceService } from '../jobdataservice.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: any;

  constructor(private router: Router, private jobDataService: JobdataserviceService) {}

  ngOnInit(): void {
    this.job = this.jobDataService.getJob();

    if (this.job) {
      console.log('Job details:', this.job);
    } else {
      console.error('No job data available');
    }
  }
}
