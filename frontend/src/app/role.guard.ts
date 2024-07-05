import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth-service.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];
  const userRole = authService.getLoggedInUserType();

  console.log('Checking role guard');
  console.log('Expected role:', expectedRole);
  console.log('User role:', userRole);

  if (authService.getToken() && userRole === expectedRole) {
    return true;
  } else {
    console.log('Role guard failed, redirecting to /');
    router.navigate(['/']);
    return false;
  }
};
