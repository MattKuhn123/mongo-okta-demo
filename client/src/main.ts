import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHttpInterceptorFn } from '@auth0/auth0-angular';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { LoginReturnComponent } from './app/login-return/login-return.component';

export const loginReturn: string = "login-return";
export const home: string = "home";

const routes: Routes = [
  { path: `${loginReturn}`, component: LoginReturnComponent },
  { path: `${home}`, component: AppComponent },
  { path: `*`, component: AppComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: environment.domain,
      clientId: environment.clientId,
      authorizationParams: {
        audience: environment.audience,
        redirect_uri: `${window.location.origin}/${loginReturn}`,
      },
      httpInterceptor: {
        allowedList: [`${environment.api}/*`, `${environment.api}/`],
      }
    }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideRouter(routes)
  ],
});
