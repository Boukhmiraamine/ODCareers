import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupRecruterComponent } from './signup-recruter/signup-recruter.component';
import { NavbarLandingComponent } from './navbar-landing/navbar-landing.component';
import { FooterComponent } from './footer/footer.component';
import { HomeLandingComponent } from './home-landing/home-landing.component';
import { LoginComponent } from './login/login.component';
import { NavLandingComponent } from './nav-landing/nav-landing.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SignupCandidatsComponent } from './signup-candidats/signup-candidats.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { HomeRecruiterComponent } from './home-recruiter/home-recruiter.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { JobOfferModalViewComponent } from './job-offer-modal-view/job-offer-modal-view.component';
import { ProfileRecruiterComponent } from './profile-recruiter/profile-recruiter.component';
import { OffresCandidatesComponent } from './offres-candidates/offres-candidates.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AddJobOfferDialogComponent } from './add-job-offer-dialog/add-job-offer-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModifyJobOfferDialogComponent } from './modify-job-offer-dialog/modify-job-offer-dialog.component';
import { HomecandidateComponent } from './homecandidate/homecandidate.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApplyConfirmationDialogComponent } from './apply-confirmation-dialog/apply-confirmation-dialog.component';
import { SnackbarComfirmationApplyJobComponent } from './snackbar-comfirmation-apply-job/snackbar-comfirmation-apply-job.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { ProfilecandidateComponent } from './profilecandidate/profilecandidate.component';
import { ProfilecandidatesettingsComponent } from './profilecandidatesettings/profilecandidatesettings.component';





@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SignupRecruterComponent,
    NavbarLandingComponent,
    FooterComponent,
    HomeLandingComponent,
    LoginComponent,
    NavLandingComponent,
    SignupCandidatsComponent,
    ContactComponent,
    HomeRecruiterComponent,
    JobOfferModalViewComponent,
    ProfileRecruiterComponent,
    OffresCandidatesComponent,
    AddJobOfferDialogComponent,
    ModifyJobOfferDialogComponent,
    HomecandidateComponent,
    ApplyConfirmationDialogComponent,
    SnackbarComfirmationApplyJobComponent,
    JobDetailComponent,
    ProfilecandidateComponent,
    ProfilecandidatesettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatButtonModule, 
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
