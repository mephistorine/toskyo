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
import {interval as dateFnsInterval, isWithinInterval} from "date-fns"
import {map, of, switchMap} from "rxjs"

import {CalendarEventsPageComponentStore} from "./calendar-events-page-component.store"

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
    TuiMapperPipeModule
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
          return calendarEvents.filter((event) => {
            if (event.endDate === null) {
              return selectedDate.daySame(
                TuiDay.fromLocalNativeDate(new Date(event.startDate))
              )
            }

            const interval = dateFnsInterval(
              new Date(event.startDate),
              new Date(event.endDate)
            )

            return isWithinInterval(selectedDate.toLocalNativeDate(), interval)
          })
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
      const hasEvents =
        events.filter((event) => {
          if (event.endDate === null) {
            return tuiDay.daySame(
              TuiDay.fromLocalNativeDate(new Date(event.startDate))
            )
          }

          const interval = dateFnsInterval(
            new Date(event.startDate),
            new Date(event.endDate)
          )

          return isWithinInterval(tuiDay.toLocalNativeDate(), interval)
        }).length > 0

      return hasEvents ? ["var(--tui-info-fill)"] : []
    }
  }

  protected onDayClick(day: TuiDay): void {
    this.localStore.set({selectedDate: day})
  }

  protected onClickTodayButton(): void {
    this.localStore.set({selectedDate: TuiDay.fromLocalNativeDate(new Date())})
  }
}
