import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';

interface SocialCard {
  name: string;
  handle: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private platformId = inject(PLATFORM_ID);

  readonly currentYear = new Date().getFullYear();
  readonly email = 'palhiranmoy99@gmail.com';
  copied = signal(false);

  readonly socialCards: SocialCard[] = [
    {
      name: 'GitHub',
      handle: '@hiranmoy-pal',
      icon: 'fa-github',
      url: 'https://github.com/hiranmoy-pal',
    },
    {
      name: 'LinkedIn',
      handle: 'in/hiranmoypal',
      icon: 'fa-linkedin',
      url: 'https://www.linkedin.com/in/hiranmoypal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'X (Twitter)',
      handle: '@HiranmoyPal10',
      icon: 'fa-twitter',
      url: 'https://x.com/HiranmoyPal10?t=k872V6YvcvSIZeSZs5G4Jg&s=09',
    },
    {
      name: 'Instagram',
      handle: '@pal_hiranmoy99',
      icon: 'fa-instagram',
      url: 'https://www.instagram.com/pal_hiranmoy99?igsh=dHFiemUwNGFjZjh1',
    },
    {
      name: 'Facebook',
      handle: 'Hiranmoy Pal',
      icon: 'fa-facebook',
      url: 'https://www.facebook.com/profile.php?id=100010327479080&mibextid=2JQ9oc',
    },
  ];

  async copyEmail(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      await navigator.clipboard.writeText(this.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2200);
    } catch {
      window.location.href = `mailto:${this.email}`;
    }
  }
}