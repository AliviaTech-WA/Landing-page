import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-link',
  imports: [RouterLink],
  templateUrl: './login-link.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLinkComponent {
  readonly variant = input<'outline' | 'light'>('outline');
  protected readonly loginUrl = environment.loginUrl.trim();
  protected readonly isInternal = this.loginUrl.startsWith('/');
}
