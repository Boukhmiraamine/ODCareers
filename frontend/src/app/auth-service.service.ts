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
  private loggedInRecruiterId: string | null = null;
  private token: string | null = null;

  constructor(private http: HttpClient) {
    this.initializeAuthData();
  }

  private initializeAuthData(): void {
    this.loggedInRecruiterId = localStorage.getItem('loggedInRecruiterId');
    this.token = localStorage.getItem('authToken');
  }

  login(credentials: { username: string; password: string; userType: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, credentials, { observe: 'response' }).pipe(
      tap(response => {
        const userData = response.body;
        if (userData && userData.user.role === 'Recruiter') {
          this.setAuthData(userData.token, userData.user.id);
        }
      }),
      catchError(error => {
        console.error('Error making login request:', error);
        return throwError(() => new Error('Login failed: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  logout(): void {
    this.setAuthData(null, null);
  }

  setAuthData(token: string | null, recruiterId: string | null): void {
    this.token = token;
    this.loggedInRecruiterId = recruiterId;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    if (recruiterId) {
      localStorage.setItem('loggedInRecruiterId', recruiterId);
    } else {
      localStorage.removeItem('loggedInRecruiterId');
    }
  }

  getLoggedInRecruiterId(): string | null {
    return this.loggedInRecruiterId;
  }

  getToken(): string | null {
    return this.token;
  }

  signUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, data, { observe: 'response' });
  }
}
