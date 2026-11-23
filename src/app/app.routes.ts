import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'AliviaTech | Seguimiento entre sesiones',
  },
  { path: '**', redirectTo: '' },
];
