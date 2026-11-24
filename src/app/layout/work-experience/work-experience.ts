import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  tags: string[];
  highlights: string[];
}

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-experience.html',
  styleUrl: './work-experience.scss',
})
export class WorkExperience {
  readonly experiences: ExperienceItem[] = [
    {
      role: 'Software Engineer',
      company: 'Rensol Digital Pvt. Ltd.',
      location: 'Kolkata, India',
      period: 'April 2024 – Present',
      isCurrent: true,
      tags: ['ABP Ecosystem', 'Angular v22', 'Signals', 'Ionic (APK & IPA)', 'Ananda Plex'],
      highlights: [
        'Spearheading the development and scaling of the Ananda Bazar Patrika (ABP) ecosystem, managing high-traffic cross-platform web and mobile applications (APK & IPA).',
        'Architecting dynamic features like premium stories, Ananda Plex web series, and podcast modules, significantly enhancing user engagement and content delivery.',
        'Leveraging advanced Angular (v22), Signals, and Ionic capabilities to optimize application state, API integrations, and overall performance across all devices.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Rensol Technologies Pvt. Ltd.',
      location: 'Kolkata, India',
      period: 'Jan 2023 – March 2024',
      isCurrent: false,
      tags: ['Aaro Ananda', 'T2 Online', 'Angular 5 → 14 Migration', 'Ionic 3 → 6', 'APK & IPA'],
      highlights: [
        "Worked as a major developer for Ananda Bazar Patrika's (ABP) projects like Aaro Ananda and T2 Online, contributing to the development and maintenance of both website and mobile applications.",
        'Played a key role in migrating the Aaro Ananda web platform from Ionic Framework 3.9.5 and Angular 5.2.11 to Ionic Framework 6.3.0 and Angular 14.2.5, ensuring enhanced performance, modern features, and improved code maintainability.',
        'Ensured cross-platform compatibility and seamless performance across both web and mobile applications (APK & IPA), while optimizing UI designs for a wide range of devices.',
      ],
    },
  ];
}