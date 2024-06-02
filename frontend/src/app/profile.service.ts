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
    return this.http.post<any>(`${this.profileUrl}/${userId}/upload`, formData, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error uploading profile picture', error);
        return throwError(() => new Error('Failed to upload profile picture: ' + (error.error?.message || error.statusText)));
      })
    );
  }
}
