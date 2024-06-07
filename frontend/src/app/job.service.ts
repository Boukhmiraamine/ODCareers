import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobUrl = 'http://localhost:3000/api/jobs';
  private notificationUrl = 'http://localhost:3000/api/notifications';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  getJobsByRecruiter(recruiterId: string, page: number = 1, pageSize: number = 10): Observable<any> {
    let params: any = { recruiterId, page, pageSize };
    return this.http.get<any>(`${this.jobUrl}/byRecruiter`, { headers: this.getAuthHeaders(), params: params }).pipe(
      catchError(error => {
        console.error('Error fetching jobs by recruiter:', error);
        return throwError(() => new Error('Failed to fetch jobs: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  getJobs(recruiterId?: string): Observable<any> {
    let params: any = {};
    if (recruiterId) {
      params.recruiterId = recruiterId;
    }
    return this.http.get<any>(this.jobUrl, { headers: this.getAuthHeaders(), params: params }).pipe(
      catchError(error => {
        console.error('Error fetching jobs:', error);
        return throwError(() => new Error('Failed to fetch jobs: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post<any>(`${this.jobUrl}/`, jobData, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating job:', error);
        return throwError(() => new Error('Job creation failed: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  updateJob(jobId: string, jobData: any): Observable<any> {
    return this.http.put<any>(`${this.jobUrl}/${jobId}`, jobData, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating job:', error);
        return throwError(() => new Error('Job update failed: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete<any>(`${this.jobUrl}/${jobId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting job:', error);
        return throwError(() => new Error('Job deletion failed: ' + (error.error?.message || error.statusText)));
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

  updateApplicationStatus(jobId: string, candidateId: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.jobUrl}/${jobId}/applications/${candidateId}/status`, { status }, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating application status:', error);
        return throwError(() => new Error('Failed to update application status: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  getApplicationsByJob(jobId: string): Observable<any> {
    return this.http.get<any>(`${this.jobUrl}/${jobId}/applications`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching applications:', error);
        return throwError(() => new Error('Failed to fetch applications: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  getNotifications(): Observable<any> {
    return this.http.get<any>(this.notificationUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching notifications:', error);
        return throwError(() => new Error('Failed to fetch notifications: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  getRecruiterNotifications(userId: string): Observable<any> {
    return this.http.get<any>(`${this.notificationUrl}/recruiter/${userId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching recruiter notifications:', error);
        return throwError(() => new Error('Failed to fetch recruiter notifications: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  markNotificationRead(notificationId: string): Observable<any> {
    return this.http.put<any>(`${this.notificationUrl}/${notificationId}/read`, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error marking notification as read:', error);
        return throwError(() => new Error('Failed to mark notification as read: ' + (error.error?.message || error.statusText)));
      })
    );
  }
}
