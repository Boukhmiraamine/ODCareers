import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router) {}

  selectUserType(userType: string) {
    if (userType === 'Recruiter') {
      this.router.navigate(['/signupRecruteur', userType]);
    } else if (userType === 'Candidate') {
      this.router.navigate(['/signupCandidats', userType]);
    } else {
      console.error('Unexpected user type');
      this.router.navigate(['/']);
    }
  }
  
  

}
