import {DatePipe} from "@angular/common"
import {ChangeDetectionStrategy, Component, Inject} from "@angular/core"
import {
  TuiButtonModule,
  TuiDialogContext,
  TuiPrimitiveCheckboxModule,
  TuiSvgModule
} from "@taiga-ui/core"
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus"
import {Task} from "task/domain"

@Component({
  standalone: true,
  selector: "task-card-dialog",
  templateUrl: "./task-card-dialog.component.html",
  styleUrls: ["./task-card-dialog.component.css"],
  imports: [
    TuiButtonModule,
    TuiSvgModule,
    DatePipe,
    TuiPrimitiveCheckboxModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardDialogComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<void, Task>
  ) {}
}
