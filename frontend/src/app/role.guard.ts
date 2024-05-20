import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth-service.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];

  if (authService.getToken() && authService.getLoggedInUserType() === expectedRole) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
