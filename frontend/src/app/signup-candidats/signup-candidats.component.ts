import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-signup-candidats',
  templateUrl: './signup-candidats.component.html',
  styleUrls: ['./signup-candidats.component.css']
})
export class SignupCandidatsComponent implements OnInit {
  isLinear = false; 

  // Déclaration des formulaires
  infosPersonnellesForm!: FormGroup;
  formationExperienceForm!: FormGroup;
  infosConnexionForm!: FormGroup;
  infosEntrepriseForm: any;


  constructor(private _formBuilder: FormBuilder,private authService: AuthService) { }

  ngOnInit(): void {
    // Initialisation des formulaires
    this.infosPersonnellesForm = this._formBuilder.group({
      nomComplet: ['', Validators.required],
      status: ['', Validators.required],
      adressePostale: ['', Validators.required],
      adresseEmail: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      age: ['', Validators.required]
    });

    this.formationExperienceForm = this._formBuilder.group({
      niveauEtudes: ['', Validators.required],
      domaineEtude: ['', Validators.required],
      titreDiplome: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      certificationsDiplomes: [''],
      poste: ['', Validators.required],
      entreprise: ['', Validators.required],
      dateDebutExp: ['', Validators.required],
      dateFinExp: ['', Validators.required],
      // Ajoutez d'autres champs si nécessaire
    });

    this.infosConnexionForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  

  submitSignup() {
    if (this.infosEntrepriseForm.valid && this.infosPersonnellesForm.valid && this.infosConnexionForm.valid) {
      const signUpData = {
        ...this.infosEntrepriseForm.value,
        ...this.infosPersonnellesForm.value,
        ...this.infosConnexionForm.value,
        roles: ['ROLE_CANDIDATE '] // Adjust roles as necessary
      };
  
      this.authService.signUp(signUpData).subscribe(
        (response: any) => {
          console.log('Signup successful', response);
          // Handle successful signup here
        },
        (error: any) => {
          console.error('Signup error', error);
          // Handle signup error here
        }
      );
    }
  }
}
