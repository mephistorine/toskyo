import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core"
import {rxEffects} from "@rx-angular/state/effects"
import {RxPush} from "@rx-angular/template/push"
import {TuiDay, TuiMapperPipeModule} from "@taiga-ui/cdk"
import {
  TuiButtonModule,
  TuiCalendarModule,
  TuiMarkerHandler,
  TuiPrimitiveCalendarModule
} from "@taiga-ui/core"
import {
  CalendarEvent,
  CalendarEventApiService,
  CalendarEventService
} from "calendar-event/domain"
import {CalendarEventCardComponent} from "calendar-event/ui-card"
import {eachDayOfInterval, isEqual} from "date-fns"
import {map, of, switchMap} from "rxjs"

import {CalendarEventsPageComponentStore} from "./calendar-events-page-component.store"

function isDayHasCalendarEvent(
  day: Date,
  calendarEvent: CalendarEvent
): boolean {
  const days: Date[] = []

  if (calendarEvent.endDate === null) {
    days.push(new Date(calendarEvent.startDate))
  } else {
    days.push(
      ...eachDayOfInterval({
        start: new Date(calendarEvent.startDate),
        end: new Date(calendarEvent.endDate)
      })
    )
  }

  return days.some((d) => isEqual(d, day))
}

@Component({
  standalone: true,
  selector: "calendar-event-page",
  templateUrl: "./calendar-events-page.component.html",
  styleUrls: ["./calendar-events-page.component.css"],
  imports: [
    TuiPrimitiveCalendarModule,
    TuiCalendarModule,
    TuiButtonModule,
    RxPush,
    TuiMapperPipeModule,
    CalendarEventCardComponent
  ],
  providers: [CalendarEventsPageComponentStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventsPageComponent implements OnInit {
  private effects = rxEffects()

  protected selectedDate = this.localStore.select("selectedDate")

  protected calendarEvents = this.calendarEventService.selectAll()

  protected calendarEventsByDay = this.selectedDate.pipe(
    switchMap((selectedDate) => {
      if (selectedDate === null) {
        return of([])
      }

      return this.calendarEvents.pipe(
        map((calendarEvents) => {
          return calendarEvents.filter((event) =>
            isDayHasCalendarEvent(selectedDate.toLocalNativeDate(), event)
          )
        })
      )
    })
  )

  constructor(
    private localStore: CalendarEventsPageComponentStore,
    private calendarEventService: CalendarEventService,
    private calendarEventApiService: CalendarEventApiService
  ) {}

  public ngOnInit() {
    this.effects.register(
      this.calendarEventApiService.getFullList(),
      (calendarEvents) => {
        if (calendarEvents.isLeft()) {
          console.error(calendarEvents.unwrap())
          return
        }

        this.calendarEventService.insertMany(calendarEvents.unwrap())
      }
    )
  }

  public getMarkerHandler(events: readonly CalendarEvent[]): TuiMarkerHandler {
    return (tuiDay: TuiDay) => {
      return events.some((event) =>
        isDayHasCalendarEvent(tuiDay.toLocalNativeDate(), event)
      )
        ? ["var(--tui-info-fill)"]
        : []
    }
  }

  protected onDayClick(day: TuiDay): void {
    this.localStore.set({selectedDate: day})
  }

  protected onClickTodayButton(): void {
    this.localStore.set({selectedDate: TuiDay.fromLocalNativeDate(new Date())})
  }
}
