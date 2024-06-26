import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileUrl = 'http://localhost:3000/api/profile';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  getProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/${userId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching profile', error);
        return throwError(() => new Error('Failed to fetch profile: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  getRecruiterProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/recruiter/${userId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching recruiter profile', error);
        return throwError(() => new Error('Failed to fetch recruiter profile: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  updateProfile(userId: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/${userId}`, formData, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating profile', error);
        return throwError(() => new Error('Failed to update profile: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  uploadProfilePicture(userId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profilePicture', file);
    return this.http.post<any>(`${this.profileUrl}/upload-profile-picture`, formData, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error uploading profile picture', error);
        return throwError(() => new Error('Failed to upload profile picture: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  addEducation(education: any): Observable<any> {
    return this.http.post<any>(`${this.profileUrl}/education`, education, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error adding education', error);
        return throwError(() => new Error('Failed to add education: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  updateEducation(educationId: string, education: any): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/education/${educationId}`, education, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating education', error);
        return throwError(() => new Error('Failed to update education: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  deleteEducation(educationId: string): Observable<any> {
    return this.http.delete<any>(`${this.profileUrl}/education/${educationId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting education', error);
        return throwError(() => new Error('Failed to delete education: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  addExperience(experience: any): Observable<any> {
    return this.http.post<any>(`${this.profileUrl}/experience`, experience, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error adding experience', error);
        return throwError(() => new Error('Failed to add experience: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  updateExperience(experienceId: string, experience: any): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/experience/${experienceId}`, experience, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating experience', error);
        return throwError(() => new Error('Failed to update experience: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  deleteExperience(experienceId: string): Observable<any> {
    return this.http.delete<any>(`${this.profileUrl}/experience/${experienceId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting experience', error);
        return throwError(() => new Error('Failed to delete experience: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  addCertification(certification: any): Observable<any> {
    return this.http.post<any>(`${this.profileUrl}/certification`, certification, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error adding certification', error);
        return throwError(() => new Error('Failed to add certification: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  updateCertification(certificationId: string, certification: any): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/certification/${certificationId}`, certification, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating certification', error);
        return throwError(() => new Error('Failed to update certification: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  deleteCertification(certificationId: string): Observable<any> {
    return this.http.delete<any>(`${this.profileUrl}/certification/${certificationId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting certification', error);
        return throwError(() => new Error('Failed to delete certification: ' + (error.error?.message || error.statusText)));
      })
    );
  }
}
