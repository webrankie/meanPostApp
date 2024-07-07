import {HttpInterceptor, HttpRequest, HttpHandler} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);

  }
}
