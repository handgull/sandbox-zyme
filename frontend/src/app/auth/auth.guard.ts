import { inject } from "@angular/core";
import { CanMatchFn, RedirectCommand, Router, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { TranslocoService } from "@jsverse/transloco";
import { iif, map, of, tap } from "rxjs";

export const authGuard: CanMatchFn = (_, __) => {
  const authService = inject(AuthService);
  const translocoService = inject(TranslocoService);
  const router = inject(Router);

  return iif(
    () => authService.storedJWT() !== null,
    of(true),
    translocoService.selectTranslate("unahutorized").pipe(
      tap((translation) => alert(translation)),
      map(() => {
        const tree: UrlTree = router.parseUrl("/auth/login");
        return new RedirectCommand(tree);
      }),
    ),
  );
};
