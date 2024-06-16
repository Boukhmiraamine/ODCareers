import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  imageMimeTypes = ["image/jpeg", "image/png", "image/bmp"];
  infosEntrepriseForm: FormGroup;
  infosPersonnellesForm: FormGroup;
  infosConnexionForm: FormGroup;
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute) {
    this.infosEntrepriseForm = this._formBuilder.group({
      companyName: ['', Validators.required],
      bio: ['', Validators.required],
      activitySector: ['', Validators.required],
      addressCompany: ['', Validators.required],
      companyEmail: ['', Validators.required],
      companyPhoneNumber: ['', Validators.required],
      companyLogo: ['', Validators.required],
    });

    this.infosPersonnellesForm = this._formBuilder.group({
      recruiterFullName: ['', Validators.required],
      recruiterProfessionalTitle: ['', Validators.required],
    });

    this.infosConnexionForm = this._formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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
      const control = this.infosEntrepriseForm.get('companyLogo');
      if (control) {
        control.updateValueAndValidity();
      } else {
        console.error('CompanyLogo control is not found in the form group');
      }
    }
  }

  submitSignup() {
    console.log("Submitting Sign Up");
    console.log("Enterprise Form Values and Validity:");
    Object.keys(this.infosEntrepriseForm.controls).forEach(key => {
      const control = this.infosEntrepriseForm.get(key);
      if (control) {
        console.log(`${key}: value = ${control.value}, valid = ${control.valid}`);
      } else {
        console.log(`${key}: control is null`);
      }
    });

    console.log("Personal Info Form Values and Validity:");
    Object.keys(this.infosPersonnellesForm.controls).forEach(key => {
      const control = this.infosPersonnellesForm.get(key);
      if (control) {
        console.log(`${key}: value = ${control.value}, valid = ${control.valid}`);
      } else {
        console.log(`${key}: control is null`);
      }
    });

    console.log("Connection Info Form Values and Validity:");
    Object.keys(this.infosConnexionForm.controls).forEach(key => {
      const control = this.infosConnexionForm.get(key);
      if (control) {
        console.log(`${key}: value = ${control.value}, valid = ${control.valid}`);
      } else {
        console.log(`${key}: control is null`);
      }
    });

    if (this.infosEntrepriseForm.valid && this.infosPersonnellesForm.valid && this.infosConnexionForm.valid) {
      const formData = new FormData();
      formData.append('userType', this.userType);
      formData.append('companyName', this.infosEntrepriseForm.get('companyName')?.value);
      formData.append('bio', this.infosEntrepriseForm.get('bio')?.value);
      formData.append('activitySector', this.infosEntrepriseForm.get('activitySector')?.value);
      formData.append('addressCompany', this.infosEntrepriseForm.get('addressCompany')?.value);
      formData.append('companyEmail', this.infosEntrepriseForm.get('companyEmail')?.value);
      formData.append('companyPhoneNumber', this.infosEntrepriseForm.get('companyPhoneNumber')?.value);
      formData.append('companyLogo', this.infosEntrepriseForm.get('companyLogo')?.value);
      formData.append('recruiterFullName', this.infosPersonnellesForm.get('recruiterFullName')?.value);
      formData.append('recruiterProfessionalTitle', this.infosPersonnellesForm.get('recruiterProfessionalTitle')?.value);
      formData.append('username', this.infosConnexionForm.get('username')?.value);
      formData.append('email', this.infosConnexionForm.get('email')?.value);
      formData.append('password', this.infosConnexionForm.get('password')?.value);

      this.authService.signUp(formData).subscribe(
        (response: any) => {
          console.log('Signup successful', response);
          alert('Signup successful');
        },
        (error: any) => {
          console.error('Signup error', error);
          alert('Signup error');
        }
      );
    }
  }
}
