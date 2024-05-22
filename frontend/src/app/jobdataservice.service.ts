import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobdataserviceService {
  private job: any;

  constructor() { }
  setJob(job: any) {
    this.job = job;
  }

  getJob() {
    return this.job;
  }
}
