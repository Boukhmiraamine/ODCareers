import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { AuthService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-signup-recruter',
  templateUrl: './signup-recruter.component.html',
  styleUrls: ['./signup-recruter.component.css']
})
export class SignupRecruterComponent implements OnInit {

  userType!: string;

  // Form groups for each step
   imageMimeTypes = ["image/jpeg", "image/png", "image/bmp"];
  infosEntrepriseForm: FormGroup;
  infosPersonnellesForm: FormGroup;
  infosConnexionForm: FormGroup;
  isLinear = false;



  constructor(private _formBuilder: FormBuilder,private authService: AuthService,private route: ActivatedRoute) {
    this.infosEntrepriseForm = this._formBuilder.group({
      companyName: ['', Validators.required],
      bio: ['', Validators.required],
      activitySector: ['', Validators.required],
      addressCompany: ['', Validators.required],
      companyEmail: ['', Validators.required],
      companyPhoneNumber: ['', Validators.required], // Change based on requirement
      companyLogo: ['', Validators.required],
    });
    

    this.infosPersonnellesForm = this._formBuilder.group({
      recruiterFullName: ['', Validators.required],
      recruiterProfessionalTitle: ['', Validators.required],
      //recruiterEmail: ['', [Validators.required , Validators.email]], // If needed, otherwise remove or adjust
    });
    

// No change needed here if names are already aligned
  this.infosConnexionForm = this._formBuilder.group({
  username: ['', Validators.required],  
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required], // Changed from motDePasse to password
});

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userType = params['userType'];
    });
    console.log('User Type:', this.userType);
  }
  
  onFileChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    let files = element.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.infosEntrepriseForm.patchValue({ companyLogo: file });
  
      // Get the form control
      const control = this.infosEntrepriseForm.get('companyLogo');
      
      // Check if the control is not null
      if (control) {
        control.updateValueAndValidity();
      } else {
        console.error('CompanyLogo control is not found in the form group');
      }
    }
  }
  

  // Function to handle form submission (replace with your logic)
  submitSignup() {
    console.log("Submitting Sign Up");
    console.log("Enterprise Form Values and Validity:");
    Object.keys(this.infosEntrepriseForm.controls).forEach(key => {
      const control = this.infosEntrepriseForm.get(key);
      if (control) { // Null check
        console.log(`${key}: value = ${control.value}, valid = ${control.valid}`);
      } else {
        console.log(`${key}: control is null`);
      }
    });
  
    console.log("Personal Info Form Values and Validity:");
    Object.keys(this.infosPersonnellesForm.controls).forEach(key => {
      const control = this.infosPersonnellesForm.get(key);
      if (control) { // Null check
        console.log(`${key}: value = ${control.value}, valid = ${control.valid}`);
      } else {
        console.log(`${key}: control is null`);
      }
    });
  
    console.log("Connection Info Form Values and Validity:");
    Object.keys(this.infosConnexionForm.controls).forEach(key => {
      const control = this.infosConnexionForm.get(key);
      if (control) { // Null check
        console.log(`${key}: value = ${control.value}, valid = ${control.valid}`);
      } else {
        console.log(`${key}: control is null`);
      }
    });
  
    if (this.infosEntrepriseForm.valid && this.infosPersonnellesForm.valid && this.infosConnexionForm.valid) {
      const signUpData = {
        userType: this.userType,
        ...this.infosEntrepriseForm.value,
        ...this.infosPersonnellesForm.value,
        ...this.infosConnexionForm.value
      };

      this.authService.signUp(signUpData).subscribe(
        (response: any) => {
          console.log('Signup successful', response);
          alert('Signup successful')
          // Handle successful signup here
        },
        (error: any) => {
          console.error('Signup error', error);
          alert('Signup error')
          // Handle signup error here
        }
      );
    }
  }

  

  
}
