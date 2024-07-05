import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Checking auth guard');
  console.log('Token:', authService.getToken());

  if (authService.getToken()) {
    return true;
  } else {
    console.log('Auth guard failed, redirecting to /login');
    router.navigate(['/login']);
    return false;
  }
};
