import { Component } from '@angular/core';


export interface Candidate {
  id: number;
  name: string;
  position: string;
  avatarUrl: string;
  summary: string;
  status: 'waiting' | 'accepted' | 'refused';
}

@Component({
  selector: 'app-offres-candidates',
  templateUrl: './offres-candidates.component.html',
  styleUrls: ['./offres-candidates.component.css']
})
export class OffresCandidatesComponent {

  totalJobs = 100; 
  pageSize = 10;

  candidates: Candidate[] = [
    // Waiting candidates
    {
      id: 1,
      name: 'Jane Doe',
      position: 'Software Engineer',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Experienced in Angular and TypeScript.',
      status: 'waiting'
    },
    {
      id: 2,
      name: 'Robert Turner',
      position: 'Web Developer',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Proficient in React and Node.js.',
      status: 'waiting'
    },
    {
      id: 3,
      name: 'Emily Clarkson',
      position: 'Data Analyst',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Expert in data visualization and Python.',
      status: 'waiting'
    },
    {
      id: 4,
      name: 'Mohamed Al Fayed',
      position: 'System Architect',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Specializes in system security and architecture.',
      status: 'waiting'
    },
    {
      id: 5,
      name: 'Lucy Liu',
      position: 'Network Engineer',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Experienced with Cisco systems and network troubleshooting.',
      status: 'waiting'
    },
  
    // Accepted candidates
    {
      id: 6,
      name: 'John Smith',
      position: 'Project Manager',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Strong background in project management and team leadership.',
      status: 'accepted'
    },
    {
      id: 7,
      name: 'Angela Hart',
      position: 'HR Specialist',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Experienced in HR operations and employee management.',
      status: 'accepted'
    },
    {
      id: 8,
      name: 'Samuel Jackson',
      position: 'Marketing Director',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Expert in digital marketing strategies and brand development.',
      status: 'accepted'
    },
    {
      id: 9,
      name: 'Chloe Kim',
      position: 'Sales Manager',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Strong sales background with extensive B2B experience.',
      status: 'accepted'
    },
    {
      id: 10,
      name: 'Leo Gonzalez',
      position: 'Chief Financial Officer',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Deep expertise in finance management and strategic investments.',
      status: 'accepted'
    },
  
    // Refused candidates
    {
      id: 11,
      name: 'Alice Johnson',
      position: 'UI/UX Designer',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Skilled in designing intuitive user interfaces.',
      status: 'refused'
    },
    {
      id: 12,
      name: 'Mark Renner',
      position: 'Product Manager',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Experienced in product lifecycle management and user-centric design.',
      status: 'refused'
    },
    {
      id: 13,
      name: 'Sophia Loren',
      position: 'Content Creator',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Creative writer and content strategist with a focus on tech startups.',
      status: 'refused'
    },
    {
      id: 14,
      name: 'David Guetta',
      position: 'Sound Engineer',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Experienced in studio engineering and sound design.',
      status: 'refused'
    },
    {
      id: 15,
      name: 'Tara Smith',
      position: 'Chief Operating Officer',
      avatarUrl: 'https://via.placeholder.com/150',
      summary: 'Proven leadership in operations and efficiency improvement.',
      status: 'refused'
    }
  ];
  

  get waitingCandidates() {
    return this.candidates.filter(c => c.status === 'waiting');
  }

  get acceptedCandidates() {
    return this.candidates.filter(c => c.status === 'accepted');
  }

  get refusedCandidates() {
    return this.candidates.filter(c => c.status === 'refused');
  }

  viewProfile(candidate: Candidate) {
    console.log('Viewing profile:', candidate);
    // Placeholder for profile viewing logic
  }

  acceptCandidate(candidate: Candidate) {
    candidate.status = 'accepted';
    console.log('Accepted:', candidate);
    // Placeholder for update logic
  }

  refuseCandidate(candidate: Candidate) {
    candidate.status = 'refused';
    console.log('Refused:', candidate);
    // Placeholder for update logic
  }

  onPageChange(): void {
    // Here you can call a service to fetch data for the corresponding page
    // This is typically done by sending the page and pageSize to your backend API
  }
}
