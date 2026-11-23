import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent {
  protected readonly email = 'aliviatechcrew@gmail.com';
  protected readonly copyStatus = signal('Copiar');

  protected async copyEmail(): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      this.copyStatus.set('No disponible');
      return;
    }

    try {
      await navigator.clipboard.writeText(this.email);
      this.copyStatus.set('Copiado');
    } catch {
      this.copyStatus.set('No disponible');
    }
  }
}
