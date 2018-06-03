import { AuthService } from '../services/auth.service';
import { HttpInterceptor,HttpRequest,HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    // const authToken = this.auth.GetAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('ApiAuthToken', "test")
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}