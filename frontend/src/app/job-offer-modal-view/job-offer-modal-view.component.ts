import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

export interface JobOffer {
  id?: number;
  title: string;
  location: string;
  companyLogo: string;
  companyName: string;
  companyDescription: string;
  shortDescription: string;
  publicationStart: string;
  publicationEnd: string;
  positionsAvailable: string;
  responsibilities?: string[];
  requirements?: string[];
  candidateCount?:number;
}

@Component({
  selector: 'app-job-offer-modal-view',
  templateUrl: './job-offer-modal-view.component.html',
  styleUrls: ['./job-offer-modal-view.component.css']
})
export class JobOfferModalViewComponent {

  constructor(
    public dialogRef: MatDialogRef<JobOfferModalViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {} // Injecting data

    JOB_OFFERS: JobOffer[] = [
      {
          id: 1,
          title: "Web Developer",
          location: "New York, NY",
          companyLogo: "path/to/logo1.png",
          companyName: "Tech Innovations Inc.",
          companyDescription: "An innovative company working on cutting edge web technologies.",
          shortDescription: "Join our team as a web developer focusing on front-end technologies.",
          publicationStart: "2024-04-01",
          publicationEnd: "2024-04-15",
          positionsAvailable: '3',
          responsibilities: [
              "Develop and maintain website architecture and features. Collaborate with front-end developers to integrate user-facing elements. Optimize applications for maximum speed and scalability."
          ],
          requirements: [
              "Proven experience as a Web Developer. Familiarity with HTML, CSS, JavaScript.Experience with frameworks such as React or Angular."
          ],
          candidateCount: 0
          
      },
      {
          id: 2,
          title: "Software Engineer",
          location: "San Francisco, CA",
          companyLogo: "path/to/logo2.png",
          companyName: "Software Solutions Ltd.",
          companyDescription: "We provide bespoke software solutions to business problems.",
          shortDescription: "We are looking for a software engineer to develop and design software solutions.",
          publicationStart: "2024-04-10",
          publicationEnd: "2024-04-24",
          positionsAvailable: '2',
          responsibilities: [
              "Analyze user needs and develop software solutions. Modify software to fix errors, improve its performance, or upgrade interfaces. Direct system testing and validation procedures."
          ],
          requirements: [
              "Bachelor's degree in computer science or related degree. Knowledge of the software development life-cycle. Strong problem solving and verbal and written communication skills."
          ],
          candidateCount: 0
      },
      {
        id: 3,
        title: "UI/UX Designer",
        location: "Austin, TX",
        companyLogo: "path/to/logo3.png",
        companyName: "Creative Designs Ltd.",
        companyDescription: "Dedicated to crafting user experiences that are intuitive and engaging.",
        shortDescription: "Seeking a creative UI/UX Designer to redefine our digital interfaces.",
        publicationStart: "2024-05-01",
        publicationEnd: "2024-05-15",
        positionsAvailable: '1',
        responsibilities: [
            "Design graphic user interface elements, like menus, tabs, and widgets. Build page navigation buttons and search fields. Create original graphic designs (e.g., images, sketches, and tables). Identify and troubleshoot UX problems (e.g., responsiveness)."
        ],
        requirements: [
            "Proven work experience as a UI/UX Designer or similar role. Portfolio of design projects.",
            "Knowledge of wireframe tools (e.g., Wireframe.cc and InVision).Good time-management skills.",
            "BSc in Design, Computer Science, or relevant field."
        ],
        candidateCount: 0
    },
    {
        id: 4,
        title: "Data Scientist",
        location: "Seattle, WA",
        companyLogo: "path/to/logo4.png",
        companyName: "Data Insights Inc.",
        companyDescription: "Innovators in the field of data analytics and machine learning.",
        shortDescription: "Looking for a data scientist to leverage big data to drive enterprise strategy.",
        publicationStart: "2024-05-20",
        publicationEnd: "2024-06-10",
        positionsAvailable: '1',
        responsibilities: [
            "Analyze large data sets to derive actionable insights.",
            "Use predictive modeling to increase and optimize customer experiences.",
            "Develop custom data models and algorithms to apply to data sets.",
            "Use data-driven techniques to solve business problems presenting results using clear marketable visuals."
        ],
        requirements: [
            "Experience using statistical computer languages (R, Python, SLQ, etc.) to manipulate data and draw insights from large data sets.",
            "Experience working with and creating data architectures.",
            "Knowledge of a variety of machine learning techniques (clustering, decision tree learning, artificial neural networks, etc.) and their real-world advantages/drawbacks.",
            "Excellent written and verbal communication skills for coordinating across teams.",
            "Degree in Statistics, Mathematics, Computer Science or another quantitative field."
        ],
        candidateCount: 0
    }
      // Add more job offers as needed
  ];
}
