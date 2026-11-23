import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LandingPageComponent } from './landing-page';

describe('LandingPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders every original landing section', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    for (const id of [
      'inicio',
      'como-funciona',
      'experiencias',
      'informacion',
      'analisis',
      'seguridad',
    ]) {
      expect(root.querySelector(`#${id}`)).toBeTruthy();
    }
    expect(root.querySelector('.final-cta')).toBeTruthy();
    expect(root.querySelector('.site-footer')).toBeTruthy();
  });

  it('opens the mobile menu and closes it with Escape', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const menuButton = root.querySelector<HTMLButtonElement>('.menu-toggle');
    const navigation = root.querySelector<HTMLElement>('.primary-nav');

    menuButton?.click();
    fixture.detectChanges();
    expect(menuButton?.getAttribute('aria-expanded')).toBe('true');
    expect(navigation?.classList.contains('open')).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(menuButton?.getAttribute('aria-expanded')).toBe('false');
    expect(navigation?.classList.contains('open')).toBe(false);
  });

  it('changes the highlighted experience with the role selector', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const psychologistButton = root.querySelector<HTMLButtonElement>('#role-psychologist');

    psychologistButton?.click();
    fixture.detectChanges();

    expect(psychologistButton?.getAttribute('aria-pressed')).toBe('true');
    expect(root.querySelector('#psicologos')?.classList.contains('is-featured')).toBe(true);
    expect(root.querySelector('#pacientes')?.classList.contains('is-muted')).toBe(true);
  });

  it('exposes real contact and legal destinations while login remains unconfigured', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const hrefs = [...root.querySelectorAll<HTMLAnchorElement>('a')].map((link) => link.getAttribute('href'));

    expect(hrefs).toContain('/legal/politica-privacidad-v1.0.html');
    expect(hrefs).toContain('/legal/terminos-uso-v1.0.html');
    expect(hrefs).toContain('mailto:aliviatechcrew@gmail.com?subject=Contacto%20desde%20AliviaTech');
    expect(root.querySelectorAll<HTMLButtonElement>('.login-pending:disabled').length).toBe(3);
  });
});
