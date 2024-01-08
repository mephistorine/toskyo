import {ChangeDetectionStrategy, Component, Input} from "@angular/core"
import {CalendarEvent} from "calendar-event/domain"

@Component({
  selector: "calendar-event-card",
  standalone: true,
  templateUrl: "./calendar-event-card.component.html",
  styleUrl: "./calendar-event-card.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventCardComponent {
  @Input({required: true})
  public calendarEvent!: CalendarEvent
}
