import {DatePipe} from "@angular/common"
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from "@angular/core"
import {TuiPrimitiveCheckboxModule} from "@taiga-ui/core"
import {Task} from "task/domain"

@Component({
  selector: "task-card",
  standalone: true,
  templateUrl: "./task-card.component.html",
  styleUrl: "./task-card.component.css",
  imports: [DatePipe, TuiPrimitiveCheckboxModule],
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
  public clickContent = new EventEmitter<void>()

  @Output()
  public clickCheckbox = new EventEmitter<void>()

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public onCheckboxClick(): void {
    // Change local checkbox state
    this.task = {
      ...this.task,
      isCompleted: !this.task.isCompleted
    }
    this.changeDetectorRef.detectChanges()
    this.clickCheckbox.emit()
  }
}
