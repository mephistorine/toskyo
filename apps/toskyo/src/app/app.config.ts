import {ApplicationConfig, importProvidersFrom, isDevMode} from "@angular/core"
import {provideAnimations} from "@angular/platform-browser/animations"
import {provideRouter} from "@angular/router"
import {provideServiceWorker} from "@angular/service-worker"
import {TuiRootModule} from "@taiga-ui/core"

import {appRoutes} from "./app.routes"

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000"
    }),
    importProvidersFrom(TuiRootModule)
  ]
}
