import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      userType: ['Recruiter', Validators.required] // Defaulting to 'Recruiter'
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Navigate based on userType or some other logic
          const redirectRoute = this.loginForm.value.userType === 'Recruiter' ? '/homerecruiter' : '/homecandidate';
          this.router.navigate([redirectRoute]);
        },
        error: (error) => {
          console.error('Login error', error);
          alert('Login error');
        }
      });
    } else {
      console.error('Form is not valid');
      alert('Form is not valid');
    }
  }
}
