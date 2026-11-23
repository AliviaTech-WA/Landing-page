import { AfterViewInit, DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appHeroScale]',
})
export class HeroScaleDirective implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private observer?: ResizeObserver;

  ngAfterViewInit(): void {
    const node = this.element.nativeElement;
    const updateScale = (): void => {
      const scale = Math.min(node.clientWidth / 624, 1);
      this.renderer.setStyle(node, '--hero-scale', String(scale));
    };

    updateScale();
    if (typeof ResizeObserver === 'undefined') return;

    this.observer = new ResizeObserver(updateScale);
    this.observer.observe(node);
    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }
}
