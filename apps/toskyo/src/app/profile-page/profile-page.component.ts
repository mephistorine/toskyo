import {ChangeDetectionStrategy, Component} from "@angular/core"
import {CommonModule} from "@angular/common"

@Component({
  selector: "tsk-profile-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile-page.component.html",
  styleUrl: "./profile-page.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {}
