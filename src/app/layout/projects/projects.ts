import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ProjectFeature {
  icon: string;
  label: string;
}

interface ProjectItem {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
  features: ProjectFeature[];
  techStack: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  readonly projects: ProjectItem[] = [
    {
      badge: 'Flagship E-Commerce',
      title: 'AstraVastra',
      subtitle: 'Modern Full-Flow E-Commerce Web Application',
      description:
        'A fully responsive, production-style e-commerce web application built with Angular 21, Server-Side Rendering (SSR), and Signals. Engineered for high SEO performance, instant initial loads, and a seamless end-to-end shopping journey.',
      liveUrl: 'https://astra-vastra.vercel.app/',
      githubUrl: 'https://github.com/hiranmoy-pal/astra-vastra',
      highlights: [
        'Implemented Server-Side Rendering (SSR) to significantly improve SEO and initial page load performance.',
        'Designed dynamic product listing & detail views, modular components, and seamless routing for an optimized shopping experience.',
        'Integrated end-to-end shopping workflows including Cart, Wishlist, Order History, and secure Login with JWT Authentication.',
      ],
      features: [
        { icon: 'fa-th-large', label: 'Product List & Details' },
        { icon: 'fa-shopping-bag', label: 'Smart Cart' },
        { icon: 'fa-heart', label: 'Wishlist' },
        { icon: 'fa-history', label: 'Order History' },
        { icon: 'fa-lock', label: 'Login & JWT Auth' },
        { icon: 'fa-rocket', label: 'SSR & SEO Ready' },
      ],
      techStack: [
        'Angular 21',
        'Angular SSR',
        'Angular Signals',
        'TypeScript',
        'JWT Auth',
        'REST APIs',
        'SCSS',
      ],
    },
  ];
}