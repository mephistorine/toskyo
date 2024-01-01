import {ChangeDetectionStrategy, Component, inject} from "@angular/core"
import {CommonModule} from "@angular/common"
import {Router} from "@angular/router"
import {TuiButtonModule} from "@taiga-ui/core"
import {TuiToggleModule} from "@taiga-ui/kit"
import PocketBaseClient from "pocketbase"

/**
 * @deprecated
 */

@Component({
  selector: "tsk-profile-page",
  standalone: true,
  imports: [CommonModule, TuiButtonModule, TuiToggleModule],
  templateUrl: "./profile-page.component.html",
  styleUrl: "./profile-page.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  private readonly pocketBaseClient = inject(PocketBaseClient)
  private readonly router = inject(Router)
  protected onClickLogout() {
    this.pocketBaseClient.authStore.clear()
    this.router.navigateByUrl("/login")
  }
}
