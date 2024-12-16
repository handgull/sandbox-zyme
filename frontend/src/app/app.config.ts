import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  LOCALE_ID,
  APP_INITIALIZER,
} from "@angular/core";
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
} from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { TranslocoHttpLoader } from "./transloco-loader";
import {
  getBrowserLang,
  provideTransloco,
  Translation,
  TranslocoService,
} from "@jsverse/transloco";
import { authInterceptor } from "./auth/auth.interceptor";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { registerLocaleData } from "@angular/common";
import localeIt from "@angular/common/locales/it";
import { lastValueFrom } from "rxjs";

registerLocaleData(localeIt);

export function initializeTranslations(translateService: TranslocoService) {
  return (): Promise<Translation> => {
    return lastValueFrom(translateService.load(getBrowserLang() ?? "en"));
  };
}

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: "top",
  anchorScrolling: "enabled",
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, inMemoryScrollingFeature),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideTransloco({
      config: {
        availableLangs: ["en", "it"],
        defaultLang: getBrowserLang(),
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAnimationsAsync(),
    {
      provide: LOCALE_ID,
      deps: [],
      useFactory: () => getBrowserLang(),
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslations,
      deps: [TranslocoService],
      multi: true,
    },
    NG_EVENT_PLUGINS,
  ],
};
