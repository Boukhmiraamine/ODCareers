import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UserData {
  _id: string;
  userType: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';
  private jobUrl = 'http://localhost:3000/api/jobs';
  private loggedInRecruiterId: string | null = null;

  constructor(private http: HttpClient) {
    this.initializeRecruiterId();
  }

  private initializeRecruiterId(): void {
    this.loggedInRecruiterId = localStorage.getItem('loggedInRecruiterId');
  }

  login(credentials: { username: string; password: string; userType: string }): Observable<any> {
    return this.http.post<UserData>(`${this.baseUrl}/signin`, credentials, { observe: 'response' }).pipe(
      tap(response => {
        const userData = response.body;
        if (userData && userData.userType === 'recruiter') {
          this.setLoggedInRecruiterId(userData._id);
        }
      }),
      catchError(error => {
        console.error('Error making login request:', error);
        return throwError(() => new Error('Login failed: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  logout(): void {
    this.setLoggedInRecruiterId(null);
  }

  setLoggedInRecruiterId(id: string | null): void {
    this.loggedInRecruiterId = id;
    if (id) {
      localStorage.setItem('loggedInRecruiterId', id);
    } else {
      localStorage.removeItem('loggedInRecruiterId');
    }
  }

  getLoggedInRecruiterId(): string | null {
    return this.loggedInRecruiterId;
  }

  addJob(jobData: any): Observable<any> {
    if (!this.loggedInRecruiterId) {
      return throwError(() => new Error('No recruiter logged in'));
    }
    jobData.recruiter = this.loggedInRecruiterId;
    return this.http.post<any>(`${this.jobUrl}/`, jobData);
  }

  getAllJobs(): Observable<any> {
    return this.http.get<any>(`${this.jobUrl}`);
  }

  
  signUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, data, { observe: 'response' });
  }
}
