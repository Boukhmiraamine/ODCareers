import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';
  private loggedInUserType: string | null = null;
  private loggedInUserId: string | null = null;
  private token: string | null = null;
  private loginStatusSubject = new BehaviorSubject<boolean>(this.hasToken());

  loginStatus$ = this.loginStatusSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthData();
  }

  private initializeAuthData(): void {
    this.loggedInUserType = localStorage.getItem('loggedInUserType');
    this.loggedInUserId = localStorage.getItem('loggedInUserId');
    this.token = localStorage.getItem('authToken');
    this.loginStatusSubject.next(this.hasToken());
  }

  public hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(credentials: { username: string; password: string; mfaCode?: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, credentials, { observe: 'response' }).pipe(
      tap(response => {
        const userData = response.body;
        if (userData && userData.token) {
          this.setAuthData(userData.token, userData.user.role, userData.user.id);
          const redirectRoute = userData.user.role === 'Recruiter' ? '/homerecruiter' : '/homecandidate';
          this.router.navigate([redirectRoute]);
        } else if (userData && userData.mfaRequired) {
          // Handle MFA required
        }
      }),
      catchError(error => {
        console.error('Error making login request:', error);
        return throwError(() => new Error('Login failed: ' + (error.error?.message || error.statusText)));
      })
    );
  }

  logout(): void {
    this.setAuthData(null, null, null);
    this.router.navigate(['/login']);
  }

  setAuthData(token: string | null, userType: string | null, userId: string | null): void {
    this.token = token;
    this.loggedInUserType = userType;
    this.loggedInUserId = userId;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    if (userType) {
      localStorage.setItem('loggedInUserType', userType);
    } else {
      localStorage.removeItem('loggedInUserType');
    }
    if (userId) {
      localStorage.setItem('loggedInUserId', userId);
    } else {
      localStorage.removeItem('loggedInUserId');
    }
    this.loginStatusSubject.next(this.hasToken());
  }

  getLoggedInUserType(): string | null {
    return this.loggedInUserType;
  }

  getLoggedInUserId(): string | null {
    return this.loggedInUserId;
  }

  getToken(): string | null {
    return this.token;
  }

  signUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, data, { observe: 'response' });
  }
}
