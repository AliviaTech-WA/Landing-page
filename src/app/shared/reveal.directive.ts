import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements AfterViewInit {
  readonly appRevealDelay = input(0);

  private readonly destroyRef = inject(DestroyRef);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const node = this.element.nativeElement;
    this.renderer.addClass(node, 'reveal-item');
    this.renderer.setStyle(node, '--reveal-delay', `${this.appRevealDelay()}ms`);

    const reduceMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(node, 'is-revealed');
      return;
    }

    this.renderer.addClass(node, 'reveal-ready');
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          this.renderer.addClass(node, 'is-revealed');
          this.observer?.unobserve(node);
        }
      },
      { rootMargin: '0px 0px -9% 0px', threshold: 0.08 },
    );
    this.observer.observe(node);

    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }
}
