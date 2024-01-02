import {DatePipe} from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from "@angular/core"
import {FormsModule} from "@angular/forms"
import {TuiCheckboxModule, TuiLineClampModule} from "@taiga-ui/kit"
import {Task} from "task/domain"

@Component({
  selector: "task-card",
  standalone: true,
  templateUrl: "./task-card.component.html",
  styleUrl: "./task-card.component.css",
  imports: [TuiCheckboxModule, FormsModule, DatePipe, TuiLineClampModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {
  @HostBinding("attr.class")
  private get hostClasses() {
    return ["task-card"]
  }

  @Input({required: true})
  public task!: Task

  @Output()
  public clickContent = new EventEmitter<MouseEvent>()
}
