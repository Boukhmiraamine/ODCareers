import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  mfaRequired = false;
  passwordFieldType = 'password';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      mfaCode: ['']
    });
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {
      return { passwordStrength: true };
    }
    return null;
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  login() {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        mfaCode: this.loginForm.value.mfaCode
      };
      this.authService.login(credentials).subscribe({
        next: (response) => {
          const responseBody = response.body;
          console.log('Backend response:', responseBody);
          if (responseBody && responseBody.mfaRequired) {
            this.mfaRequired = true;
          } else if (responseBody && responseBody.token) {
            console.log('Login successful', responseBody);
            const redirectRoute = responseBody.user.role === 'Recruiter' ? '/homerecruiter' : '/homecandidate';
            this.router.navigate([redirectRoute]);
          }
        },
        error: (error) => {
          console.error('Login error', error);
          alert('Login error');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.error('Form is not valid', this.loginForm.errors);
      alert('Form is not valid');
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get mfaCode() {
    return this.loginForm.get('mfaCode');
  }
}
