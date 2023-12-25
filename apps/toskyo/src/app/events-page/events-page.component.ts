import {ChangeDetectionStrategy, Component} from "@angular/core"
import {CommonModule} from "@angular/common"

@Component({
  selector: "tsk-events-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./events-page.component.html",
  styleUrl: "./events-page.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsPageComponent {}
