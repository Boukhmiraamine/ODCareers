import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobUrl = 'http://localhost:3000/api/jobs';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  getJobs(recruiterId?: string): Observable<any> {
    let params: any = {};
    if (recruiterId) {
      params.recruiterId = recruiterId;
    }
    return this.http.get<any>(this.jobUrl, { headers: this.getAuthHeaders(), params: params });
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post<any>(`${this.jobUrl}/`, jobData, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating job:', error);
        return throwError(() => new Error('Job creation failed: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  applyToJob(jobId: string, candidateId: string): Observable<any> {
    return this.http.post<any>(`${this.jobUrl}/${jobId}/apply`, { candidateId }, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error applying to job:', error);
        return throwError(() => new Error('Job application failed: ' + (error.error?.message || error.statusText)));
      })
    );
  }
}