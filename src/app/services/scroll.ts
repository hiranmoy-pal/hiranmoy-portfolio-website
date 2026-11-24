import { Location, isPlatformBrowser } from '@angular/common';
import { Injectable, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class ScrollService {
    private platformId = inject(PLATFORM_ID);
    private location = inject(Location);
    private ngZone = inject(NgZone);
    private titleService = inject(Title);

    private animationFrameId: number | null = null;
    private urlTimer: ReturnType<typeof setTimeout> | null = null;

    isProgrammaticScroll = false;

    private readonly sectionTitles: Record<string, string> = {
        home: 'Hiranmoy Pal | Frontend Developer (Angular, Ionic & TypeScript)',
        about: 'About | Hiranmoy Pal',
        skills: 'Skills | Hiranmoy Pal',
        experience: 'Work Experience | Hiranmoy Pal',
        projects: 'Projects | Hiranmoy Pal',
        education: 'Education | Hiranmoy Pal',
        contact: 'Contact | Hiranmoy Pal',
    };

    updateUrl(sectionId: string, immediate = false): void {
        if (!isPlatformBrowser(this.platformId)) return;

        if (this.urlTimer) {
            clearTimeout(this.urlTimer);
        }

        const applyUpdate = () => {
            const targetPath = sectionId === 'home' ? '/' : `/${sectionId}`;
            const currentPath = this.location.path(true) || '/';

            if (currentPath !== targetPath) {
                this.location.replaceState(targetPath);
            }
            this.titleService.setTitle(
                this.sectionTitles[sectionId] ?? this.sectionTitles['home']
            );
        };

        if (immediate) {
            applyUpdate();
        } else {
            // Debounce URL updates during fast manual scroll to avoid main-thread stutter
            this.urlTimer = setTimeout(applyUpdate, 120);
        }
    }

    scrollToSection(sectionId: string, event?: Event, duration = 850): void {
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
        this.updateUrl(sectionId, true);

        const headerOffset = 84;
        const startY = window.scrollY;
        const targetY =
            sectionId === 'home'
                ? 0
                : target.getBoundingClientRect().top + startY - headerOffset;
        const distance = targetY - startY;

        if (Math.abs(distance) < 2) {
            this.isProgrammaticScroll = false;
            return;
        }

        const startTime = performance.now();

        const easeInOutCubic = (t: number): number =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        // Run outside NgZone so Angular doesn't run change detection 60-120x/sec
        this.ngZone.runOutsideAngular(() => {
            const step = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutCubic(progress);

                window.scrollTo({
                    top: startY + distance * eased,
                    behavior: 'instant' as ScrollBehavior,
                });

                if (progress < 1) {
                    this.animationFrameId = requestAnimationFrame(step);
                } else {
                    this.animationFrameId = null;
                    this.isProgrammaticScroll = false;
                }
            };

            this.animationFrameId = requestAnimationFrame(step);
        });
    }
}