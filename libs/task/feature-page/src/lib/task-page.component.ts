import {ChangeDetectionStrategy, Component} from "@angular/core"

@Component({
  standalone: true,
  selector: "task-page",
  templateUrl: "./task-page.component.html",
  styleUrls: ["./task-page.component.css"],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPageComponent {}
