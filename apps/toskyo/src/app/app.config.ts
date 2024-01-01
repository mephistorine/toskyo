import {provideHttpClient} from "@angular/common/http"
import {ApplicationConfig, importProvidersFrom, isDevMode} from "@angular/core"
import {provideAnimations} from "@angular/platform-browser/animations"
import {provideRouter} from "@angular/router"
import {provideServiceWorker} from "@angular/service-worker"
import {TuiAlertModule, TuiRootModule, TuiSvgModule} from "@taiga-ui/core"
import PocketBaseClient from "pocketbase"

import {appRoutes} from "./app.routes"

function pocketBaseClientFactory() {
  return new PocketBaseClient("http://localhost:8090")
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
    }
  ]
}
