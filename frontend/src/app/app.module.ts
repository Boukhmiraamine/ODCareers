import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
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
import { EducationDialogComponent } from './educationdialog/educationdialog.component';
import { ExperienceDialogComponent } from './experience-dialog/experience-dialog.component';
import { CertificationDialogComponent } from './certification-dialog/certification-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { PlanInterviewComponent } from './planinterview/planinterview.component';
import { InterviewComponent } from './interview/interview.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { WebRTCService } from './web-rtc.service';
import { WebSocketService } from './websocket.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    ProfilecandidatesettingsComponent,
    EducationDialogComponent,
    ExperienceDialogComponent,
    CertificationDialogComponent,
    PlanInterviewComponent,
    InterviewComponent
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
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FileUploadModule,
    ToastModule,
    FontAwesomeModule
  ],
  providers: [
    MessageService,
    WebRTCService,
    WebSocketService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
