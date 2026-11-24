import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  @Input('appScrollReveal') animationType:
    | 'fade-up'
    | 'fade-left'
    | 'fade-right'
    | 'zoom-in' = 'fade-up';

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const nativeEl = this.el.nativeElement;
    this.renderer.addClass(nativeEl, 'reveal-section');
    this.renderer.addClass(nativeEl, `reveal-${this.animationType}`);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(nativeEl, 'is-visible');
            this.observer?.unobserve(nativeEl); // Animate once for max smoothness
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(nativeEl);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}