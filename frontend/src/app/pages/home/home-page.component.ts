import { AuthService } from "@/auth/auth.service";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [],
  template: `<button class="btn-primary btn" (click)="authService.logout()">
    LOGOUT
  </button>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent {
  authService = inject(AuthService);
}
