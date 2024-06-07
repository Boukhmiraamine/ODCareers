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
import { JobDetailComponent } from './job-detail/job-detail.component';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';
import { loginGuard } from './login.guard';
import { ProfilecandidateComponent } from './profilecandidate/profilecandidate.component';
import { ProfilecandidatesettingsComponent } from './profilecandidatesettings/profilecandidatesettings.component';

const routes: Routes = [
  { path: '', component: HomeLandingComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'signupRecruteur/:userType', component: SignupRecruterComponent },
  { path: 'signupCandidats/:userType', component: SignupCandidatsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'homerecruiter', component: HomeRecruiterComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'Recruiter' } },
  { path: 'homecandidate', component: HomecandidateComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'Candidate' } },
  { path: 'offresCandidates/:id', component: OffresCandidatesComponent },
  { path: 'job-detail', component: JobDetailComponent },
  { path: 'profile', component: ProfilecandidateComponent },
  { path: 'profile/settings', component: ProfilecandidatesettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
