import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface EducationItem {
  degree: string;
  institutionLabel: string;
  institution: string;
  year: string;
  percentage: string;
  numericScore: number;
  icon: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  readonly educationList: EducationItem[] = [
    {
      degree: 'Graduation',
      institutionLabel: 'University',
      institution: 'CU',
      year: '2020',
      percentage: '73.50%',
      numericScore: 73.5,
      icon: 'fa-graduation-cap',
    },
    {
      degree: 'Higher Secondary',
      institutionLabel: 'Board',
      institution: 'WBCHSE',
      year: '2017',
      percentage: '75.20%',
      numericScore: 75.2,
      icon: 'fa-university',
    },
    {
      degree: 'Secondary',
      institutionLabel: 'Board',
      institution: 'WBBSE',
      year: '2015',
      percentage: '83.50%',
      numericScore: 83.5,
      icon: 'fa-book',
    },
  ];
}