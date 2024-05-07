import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/users'; // Adjust this URL based on your actual backend URL
  private jobUrl = 'http://localhost:3000/api/jobs';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string; userType: string  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, credentials, { observe: 'response' }).pipe(
      catchError(error => {
        console.error('Error making login request:', error);
        return throwError(error);
      })
    );
  }

  signUp(data: any): Observable<any> { // Replace 'any' with a more specific type based on your needs
    return this.http.post(`${this.baseUrl}/signup`, data, { observe: 'response' });
  }


  addJob(jobData: any): Observable<any> {
    return this.http.post(`${this.jobUrl}`, jobData);
  }

  getAllJobs(): Observable<any> {
    return this.http.get(`${this.jobUrl}`);
  }
}
