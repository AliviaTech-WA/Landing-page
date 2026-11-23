import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  Renderer2,
  inject,
  signal,
} from '@angular/core';
import { LoginLinkComponent } from '../login-link/login-link';

@Component({
  selector: 'app-site-header',
  imports: [LoginLinkComponent],
  templateUrl: './site-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent implements AfterViewInit {
  protected readonly menuOpen = signal(false);
  protected readonly activeSection = signal('inicio');

  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer = inject(Renderer2);
  private sectionObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const stopKeydown = this.renderer.listen(this.document, 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') this.closeMenu();
    });
    const stopResize = this.renderer.listen(window, 'resize', () => {
      if (window.innerWidth > 900) this.closeMenu();
    });

    const frame = window.requestAnimationFrame(() => this.observeSections());
    this.destroyRef.onDestroy(() => {
      stopKeydown();
      stopResize();
      window.cancelAnimationFrame(frame);
      this.sectionObserver?.disconnect();
      this.renderer.removeClass(this.document.body, 'menu-open');
    });
  }

  protected toggleMenu(): void {
    const nextState = !this.menuOpen();
    this.menuOpen.set(nextState);
    if (nextState) {
      this.renderer.addClass(this.document.body, 'menu-open');
    } else {
      this.renderer.removeClass(this.document.body, 'menu-open');
    }
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
    this.renderer.removeClass(this.document.body, 'menu-open');
  }

  private observeSections(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = this.document.querySelectorAll<HTMLElement>('[data-nav-section]');
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visible?.target.id) this.activeSection.set(visible.target.id);
      },
      { rootMargin: '-28% 0px -60% 0px', threshold: [0, 0.1, 0.35] },
    );
    sections.forEach((section) => this.sectionObserver?.observe(section));
  }
}
