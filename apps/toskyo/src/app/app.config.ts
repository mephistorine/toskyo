import {DATE_PIPE_DEFAULT_OPTIONS, DatePipeConfig} from "@angular/common"
import {provideHttpClient} from "@angular/common/http"
import {ApplicationConfig, importProvidersFrom, isDevMode} from "@angular/core"
import {provideAnimations} from "@angular/platform-browser/animations"
import {provideRouter, TitleStrategy} from "@angular/router"
import {provideServiceWorker} from "@angular/service-worker"
import {TuiSafeHtml} from "@taiga-ui/cdk"
import {
  TuiAlertModule,
  TuiRootModule,
  TuiSvgModule,
  tuiSvgSrcInterceptors
} from "@taiga-ui/core"
import PocketBaseClient from "pocketbase"
import {ToskyoTitleStrategy} from "shared/util-navigation"

import {appRoutes} from "./app.routes"

function pocketBaseClientFactory() {
  return new PocketBaseClient("http://0.0.0.0:8090")
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000"
    }),
    importProvidersFrom(TuiRootModule),
    importProvidersFrom(TuiSvgModule),
    importProvidersFrom(TuiAlertModule),
    provideHttpClient(),
    {
      provide: PocketBaseClient,
      useFactory: pocketBaseClientFactory
    },
    {
      provide: TitleStrategy,
      useClass: ToskyoTitleStrategy
    },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: "d MMM yyyy"
      } as DatePipeConfig
    },
    tuiSvgSrcInterceptors((src: TuiSafeHtml) => {
      return String(src).startsWith("ph::")
        ? `https://api.iconify.design/ph:${String(src).replace("ph::", "")}.svg`
        : src
    })
  ]
}
