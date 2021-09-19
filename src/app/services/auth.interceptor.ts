import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthTokenService } from "./auth-token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: AuthTokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.tokenService.authJwtToken) {
      const cloned = req.clone({
        headers: req.headers.set(
          "Authorization",
          this.tokenService.authJwtToken
        ),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
