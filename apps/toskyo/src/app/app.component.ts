import {AsyncPipe} from "@angular/common"
import {ChangeDetectionStrategy, Component} from "@angular/core"
import {ReactiveFormsModule} from "@angular/forms"
import {RouterModule} from "@angular/router"
import {RxPush} from "@rx-angular/template/push"
import {TuiTabBarModule} from "@taiga-ui/addon-mobile"
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule
} from "@taiga-ui/core"
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify"

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
    TuiTabBarModule
  ],
  selector: "tsk-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {}
