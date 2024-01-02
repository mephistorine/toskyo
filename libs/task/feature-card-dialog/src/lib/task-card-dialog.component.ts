import {DatePipe} from "@angular/common"
import {ChangeDetectionStrategy, Component, Inject} from "@angular/core"
import {FormsModule} from "@angular/forms"
import {
  TuiButtonModule,
  TuiDialogContext,
  TuiLabelModule,
  TuiSvgModule
} from "@taiga-ui/core"
import {TuiCheckboxModule} from "@taiga-ui/kit"
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus"
import {Task} from "task/domain"

@Component({
  standalone: true,
  selector: "task-card-dialog",
  templateUrl: "./task-card-dialog.component.html",
  styleUrls: ["./task-card-dialog.component.css"],
  imports: [
    TuiCheckboxModule,
    TuiLabelModule,
    FormsModule,
    TuiButtonModule,
    TuiSvgModule,
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardDialogComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<void, Task>
  ) {}
}
