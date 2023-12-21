import {ApplicationConfig, isDevMode} from "@angular/core"
import {provideRouter} from "@angular/router"
import {provideServiceWorker} from "@angular/service-worker"
import {appRoutes} from "./app.routes"

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000"
    })
  ]
}
