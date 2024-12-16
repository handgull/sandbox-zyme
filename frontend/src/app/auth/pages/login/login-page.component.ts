import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { provideIcons } from "@ng-icons/core";
import { heroEnvelope, heroXMark } from "@ng-icons/heroicons/outline";
import { AuthService } from "@/auth/auth.service";
import { endpoints } from "@/misc/constants";
import { TranslocoModule } from "@jsverse/transloco";

@Component({
  selector: "app-login-page",
  standalone: true,
  viewProviders: [
    provideIcons({
      heroEnvelope,
      heroXMark,
    }),
  ],
  imports: [TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *transloco="let t">
      <div class="flex h-screen w-screen items-center justify-center">
        <button
          class="btn btn-ghost hover:filter-none md:grayscale-[67.5%]"
          [title]="t('signInWith', { oauth: 'google' })"
          [disabled]="authService.authChanging()"
          (click)="googleLogin()"
        >
          <img src="/assets/auth/google-logo.svg" alt="google" />
        </button>
        <button
          class="btn btn-ghost hover:filter-none md:grayscale-[67.5%]"
          [title]="t('signInWith', { oauth: 'facebook' })"
          [disabled]="authService.authChanging()"
          (click)="facebookLogin()"
        >
          <img src="/assets/auth/facebook-logo.svg" alt="facebook" />
        </button>
      </div>
    </ng-container>
  `,
  styles: `
    .logo {
      margin-right: 12px;
    }

    app-sign-up-form {
      height: 100%;
    }
  `,
})
export default class LoginPageComponent implements OnInit {
  authService = inject(AuthService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    const token = this._route.snapshot.queryParams["accessToken"];

    if (token?.length > 0) {
      this.authService.jwt.set(token);
    } else if (token === "") {
      this._router.navigate(["auth/login"]);
    }
    if (this.authService.isLogged) {
      this._router.navigate(["home"]);
    }
  }

  facebookLogin() {
    window.location.href = endpoints.facebookLogin;
  }

  googleLogin() {
    window.location.href = endpoints.googleLogin;
  }
}
