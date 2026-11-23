import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LoginLinkComponent } from '../../components/login-link/login-link';
import { SiteFooterComponent } from '../../components/site-footer/site-footer';
import { SiteHeaderComponent } from '../../components/site-header/site-header';
import { HeroScaleDirective } from '../../shared/hero-scale.directive';
import { RevealDirective } from '../../shared/reveal.directive';

type Role = 'patient' | 'psychologist';

@Component({
  selector: 'app-landing-page',
  imports: [
    HeroScaleDirective,
    LoginLinkComponent,
    RevealDirective,
    SiteFooterComponent,
    SiteHeaderComponent,
  ],
  templateUrl: './landing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  protected readonly selectedRole = signal<Role>('patient');

  protected selectRole(role: Role): void {
    this.selectedRole.set(role);
  }

  protected handleRoleKeydown(event: KeyboardEvent): void {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    const role: Role =
      event.key === 'ArrowLeft' || event.key === 'Home' ? 'patient' : 'psychologist';
    this.selectedRole.set(role);
    const button = document.getElementById(`role-${role}`);
    button?.focus();
  }

  protected moveHero(event: PointerEvent): void {
    if (typeof window === 'undefined') return;
    if (typeof window.matchMedia !== 'function') return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    const stage = event.currentTarget as HTMLElement;
    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    stage.style.setProperty('--pointer-x', x.toFixed(3));
    stage.style.setProperty('--pointer-y', y.toFixed(3));
  }

  protected resetHero(event: PointerEvent): void {
    const stage = event.currentTarget as HTMLElement;
    stage.style.setProperty('--pointer-x', '0');
    stage.style.setProperty('--pointer-y', '0');
  }
}
