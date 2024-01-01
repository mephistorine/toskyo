import {AsyncPipe} from "@angular/common"
import {ChangeDetectionStrategy, Component, inject, Signal} from "@angular/core"
import {toSignal} from "@angular/core/rxjs-interop"
import {ReactiveFormsModule} from "@angular/forms"
import {ActivationEnd, Event, Router, RouterModule} from "@angular/router"
import {WINDOW} from "@ng-web-apis/common"
import {RxPush} from "@rx-angular/template/push"
import {TuiTabBarModule} from "@taiga-ui/addon-mobile"
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiModeModule,
  TuiRootModule,
  TuiThemeNightModule
} from "@taiga-ui/core"
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify"
import {defer, filter, fromEvent, map, startWith} from "rxjs"
import mergeDeep from "@tinkoff/utils/object/mergeDeep"

type TskRouteData = {
  tabBarEnabled: boolean
}

const DEFAULT_ROUTE_DATA: TskRouteData = {
  tabBarEnabled: true
}

@Component({
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AsyncPipe,
    RxPush,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiTabBarModule,
    TuiModeModule,
    TuiThemeNightModule
  ],
  selector: "tsk-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
  protected readonly tabBarEnabled: Signal<boolean> = toSignal(
    inject(Router).events.pipe(
      filter(
        (event: Event | ActivationEnd): event is ActivationEnd =>
          event instanceof ActivationEnd
      ),
      map((event) => {
        return mergeDeep(
          DEFAULT_ROUTE_DATA,
          event.snapshot.data
        ) as TskRouteData
      }),
      map((data) => data.tabBarEnabled)
    ),
    {initialValue: true}
  )

  protected readonly isDarkTheme = toSignal(
    defer(() => {
      const mediaQueryList = inject(WINDOW).matchMedia(
        "(prefers-color-scheme: dark)"
      )

      return fromEvent<MediaQueryListEvent>(mediaQueryList, "change").pipe(
        map((event: MediaQueryListEvent) => event.matches),
        startWith(mediaQueryList.matches)
      )
    }),
    {requireSync: true}
  )
}
