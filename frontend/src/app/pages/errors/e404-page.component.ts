import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-e404-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <span>404</span> `,
  styles: ``,
  imports: [],
})
export default class E404PageComponent {}
