import { HttpClient } from "@angular/common/http";
import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { constants, endpoints } from "@/misc/constants";
import { LoginRes, loginResSchema } from "./auth.models";
import { verifyResponse } from "@/misc/verify-response";
import { Router } from "@angular/router";

enum OauthOption {
  facebook,
  google,
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _http = inject(HttpClient);
  private _router = inject(Router);
  jwt = signal<string | null>(null);
  authChanging = signal<boolean>(false);

  get storedJWT(): WritableSignal<string | null> {
    if (!this.jwt()) {
      this.jwt.set(localStorage.getItem(constants.jwtKey));
    }

    return this.jwt;
  }

  get isLogged(): boolean {
    return this.storedJWT() !== null;
  }

  private _oauthLogin$(option: OauthOption): Observable<LoginRes> {
    this.authChanging.set(true);

    const endpoint =
      option === OauthOption.facebook
        ? endpoints.facebookLogin
        : endpoints.googleLogin;

    return this._http.get<LoginRes>(endpoint).pipe(
      verifyResponse(loginResSchema),
      tap((res: LoginRes) => {
        localStorage.setItem(constants.jwtKey, res.accessToken);
        this.jwt?.set(res.accessToken);
        this.authChanging.set(false);
      }),
      catchError((error, _) => {
        this.authChanging.set(false);
        console.error(`Error while logging with oauth! ${endpoint}`);
        return throwError(() => error);
      }),
    );
  }

  facebookLogin$(): Observable<LoginRes> {
    return this._oauthLogin$(OauthOption.facebook);
  }

  googleLogin$(): Observable<LoginRes> {
    return this._oauthLogin$(OauthOption.google);
  }

  logout() {
    this.jwt.set(null);
    localStorage.removeItem(constants.jwtKey);
    this._router.navigate(["auth/login"]);
  }
}
