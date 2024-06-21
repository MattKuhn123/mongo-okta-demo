import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHttpInterceptorFn } from '@auth0/auth0-angular';
import { environment } from './environments/environment.development';
import { jwtStringInterceptor } from './app/jwt-string.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: environment.domain,
      clientId: environment.clientId,
      authorizationParams: {
        audience: environment.audience,
        redirect_uri: window.location.origin
      },           
      httpInterceptor: {
        allowedList: [`${environment.api}/*`]
      }
    }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn, jwtStringInterceptor]))
  ]
});
