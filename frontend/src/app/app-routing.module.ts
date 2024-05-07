import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLandingComponent } from './home-landing/home-landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupRecruterComponent } from './signup-recruter/signup-recruter.component';
import { SignupCandidatsComponent } from './signup-candidats/signup-candidats.component';
import { ContactComponent } from './contact/contact.component';
import { HomeRecruiterComponent } from './home-recruiter/home-recruiter.component';
import { OffresCandidatesComponent } from './offres-candidates/offres-candidates.component';
import { HomecandidateComponent } from './homecandidate/homecandidate.component';

const routes: Routes = [
  { path: '', component: HomeLandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signupRecruteur/:userType', component: SignupRecruterComponent },
  { path: 'signupCandidats/:userType', component: SignupCandidatsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'homerecruiter' , component: HomeRecruiterComponent },
  { path: 'homecandidate' , component: HomecandidateComponent },
  { path: 'offresCandidates' , component: OffresCandidatesComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
