import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const headers = authService.storedJWT()
    ? {
        Authorization: `Bearer ${authService.storedJWT()}`,
      }
    : undefined;

  return next(
    req.clone({
      setHeaders: headers,
    }),
  );
};
