import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_BASE_URL } from './token/api-token';
import { environment } from './environments/environment';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideToastr } from 'ngx-toastr';
import { globalInterceptor } from './core/interceptors/global.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch(), withInterceptors([globalInterceptor,httpErrorInterceptor,loadingInterceptor])),
  importProvidersFrom(BrowserAnimationsModule,NgxSpinnerModule),
  provideToastr(),
  {
    provide: API_BASE_URL,
    useValue: environment.baseUrl
  },
  providePrimeNG({
    theme: {
      preset: Aura
    }
  })
  ]
};
