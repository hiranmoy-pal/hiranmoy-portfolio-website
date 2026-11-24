import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface CraftPillar {
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly pillars: CraftPillar[] = [
    {
      icon: 'fa-cubes',
      title: 'Modular Architecture',
      desc: 'Scalable, reusable components built with modern Angular Signals.',
    },
    {
      icon: 'fa-plug',
      title: 'Seamless API & State',
      desc: 'Clean REST integrations, predictable state, and snappy UX.',
    },
    {
      icon: 'fa-tachometer',
      title: 'Performance & Cross-Platform',
      desc: 'Optimized web & Ionic mobile apps that feel native everywhere.',
    },
  ];
}