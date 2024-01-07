import {Injectable} from "@angular/core"
import {Either, fromPromise} from "@sweet-monads/either"
import PocketBaseClient from "pocketbase"

import {CalendarEvent} from "../entities/calendar-event"
import {calendarEventDtoToCalendarEventMapper} from "../mappers/calendar-event-dto-to-calendar-event.mapper"

import {CALENDAR_EVENT_DTO_FIELDS, CalendarEventDto} from "./dtos"

@Injectable({
  providedIn: "root"
})
export class CalendarEventApiService {
  constructor(private pocketBaseClient: PocketBaseClient) {}

  public getFullList(): Promise<Either<Error, readonly CalendarEvent[]>> {
    return fromPromise(
      this.pocketBaseClient
        .collection("events")
        .getFullList<CalendarEventDto>({
          filter: "type = 'CALENDAR_EVENT'",
          sort: "-created",
          fields: CALENDAR_EVENT_DTO_FIELDS.join(",")
        })
        .then((calendarEvents) =>
          calendarEvents.map(calendarEventDtoToCalendarEventMapper)
        )
    )
  }
}
