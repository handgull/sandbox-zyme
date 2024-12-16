import { TuiRoot } from "@taiga-ui/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TuiRoot],
  template: `
    <tui-root>
      <main>
        <router-outlet />
      </main>
    </tui-root>
  `,
  styles: `
    main {
      position: fixed;
      width: 100%;
      margin-top: var(--header-height);
      min-height: calc(100vh - var(--header-height));
      overflow: auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
