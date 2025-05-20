import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedUserGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);
  const _ruter = inject(Router);

  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('userToken')) {
      _ruter.navigate(['/home']);
      return false;
    }
    return true;
  } else {
    return false;
  }

};
