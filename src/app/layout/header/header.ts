import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { ScrollService } from '../../services/scroll';

interface NavItem {
  id: string;
  label: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private scrollService = inject(ScrollService);
  private location = inject(Location);
  private sectionObserver: IntersectionObserver | null = null;
  private scrollListener?: () => void;

  isDark = signal(false);
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  activeSection = signal('home');

  readonly navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  readonly socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      icon: 'fa-linkedin',
      url: 'https://www.linkedin.com/in/hiranmoypal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Github',
      icon: 'fa-github',
      url: 'https://github.com/hiranmoy-pal',
    },
    {
      name: 'X (Twitter)',
      icon: 'fa-twitter',
      url: 'https://x.com/HiranmoyPal10?t=k872V6YvcvSIZeSZs5G4Jg&s=09',
    },
    {
      name: 'Instagram',
      icon: 'fa-instagram',
      url: 'https://www.instagram.com/pal_hiranmoy99?igsh=dHFiemUwNGFjZjh1',
    },
    {
      name: 'Facebook',
      icon: 'fa-facebook',
      url: 'https://www.facebook.com/profile.php?id=100010327479080&mibextid=2JQ9oc',
    },
    {
      name: 'Email',
      icon: 'fa-envelope',
      url: 'mailto:palhiranmoy99@gmail.com',
    },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const hasDarkClass =
        document.documentElement.classList.contains('dark-theme');
      this.isDark.set(savedTheme === 'dark' || hasDarkClass);

      const onScroll = () => this.isScrolled.set(window.scrollY > 20);
      window.addEventListener('scroll', onScroll, { passive: true });
      this.scrollListener = () => window.removeEventListener('scroll', onScroll);
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Strip any leftover #hash from the URL on load
    const initialPath = this.location.path().replace(/^\//, '');
    if (initialPath && this.navItems.some((item) => item.id === initialPath)) {
      this.activeSection.set(initialPath);
      setTimeout(() => this.scrollService.scrollToSection(initialPath), 100);
    } else if (window.location.hash) {
      this.scrollService.updateUrl('home');
    }

    // Update active menu + URL cleanly on manual scroll
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        if (this.scrollService.isProgrammaticScroll) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.activeSection.set(id);
            this.scrollService.updateUrl(id);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    this.navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) this.sectionObserver?.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.scrollListener?.();
  }

  selectSection(id: string, event: Event): void {
    this.activeSection.set(id);
    this.closeMenu();
    this.scrollService.scrollToSection(id, event);
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const nextDark = !this.isDark();
    this.isDark.set(nextDark);
    document.documentElement.classList.toggle('dark-theme', nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.isScrolled.set(window.scrollY > 20);

    const scrollPosition = window.scrollY + 140;
    for (let i = this.navItems.length - 1; i >= 0; i--) {
      const item = this.navItems[i];
      const section = document.getElementById(item.id);
      if (section && section.offsetTop <= scrollPosition) {
        this.activeSection.set(item.id);
        break;
      }
    }
  }
}