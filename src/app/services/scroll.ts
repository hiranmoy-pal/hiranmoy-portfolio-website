import { Location, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class ScrollService {
    private platformId = inject(PLATFORM_ID);
    private location = inject(Location);
    private animationFrameId: number | null = null;

    private titleService = inject(Title);

    private readonly sectionTitles: Record<string, string> = {
        home: 'Hiranmoy Pal | Frontend Developer (Angular, Ionic & TypeScript)',
        about: 'About | Hiranmoy Pal',
        skills: 'Skills | Hiranmoy Pal',
        experience: 'Work Experience | Hiranmoy Pal',
        projects: 'Projects | Hiranmoy Pal',
        education: 'Education | Hiranmoy Pal',
        contact: 'Contact | Hiranmoy Pal',
    };

    isProgrammaticScroll = false;

    updateUrl(sectionId: string): void {
        if (!isPlatformBrowser(this.platformId)) return;

        const targetPath = sectionId === 'home' ? '/' : `/${sectionId}`;
        const currentPath = this.location.path(true) || '/';

        if (currentPath !== targetPath) {
            this.location.replaceState(targetPath);
        }

        // Inside updateUrl(sectionId: string):
        this.titleService.setTitle(
            this.sectionTitles[sectionId] ?? this.sectionTitles['home']
        );
    }

    scrollToSection(sectionId: string, event?: Event, duration = 900): void {
        if (event) {
            event.preventDefault();
        }
        if (!isPlatformBrowser(this.platformId)) return;

        const target = document.getElementById(sectionId);
        if (!target) return;

        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }

        this.isProgrammaticScroll = true;
        this.updateUrl(sectionId);

        const headerOffset = 84;
        const startY = window.scrollY;
        const targetY =
            sectionId === 'home'
                ? 0
                : target.getBoundingClientRect().top + startY - headerOffset;
        const distance = targetY - startY;
        const startTime = performance.now();

        const easeInOutCubic = (t: number): number =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);

            window.scrollTo(0, startY + distance * eased);

            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(step);
            } else {
                this.animationFrameId = null;
                this.isProgrammaticScroll = false;
            }
        };

        this.animationFrameId = requestAnimationFrame(step);
    }
}