import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// TODO : Waiting for Mongo to address aud array marshal issue
export const jwtStringInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = req.headers.get("Authorization");

  if (req.url.includes(environment.api) && authToken) {
    // TODO : This breaks CORS
    // req = req.clone({ setHeaders: { jwtTokenString: authToken } });
  }

  console.log("Intercepted request");
  return next(req);
};