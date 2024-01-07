import {Injectable} from "@angular/core"
import {RxState} from "@rx-angular/state"
import {EntityState, EntityStateController} from "shared/util-state"

import {CalendarEvent} from "../entities/calendar-event"

@Injectable({
  providedIn: "root"
})
export class CalendarEventService extends EntityStateController<CalendarEvent> {
  constructor() {
    super(new RxState<EntityState<CalendarEvent>>())
    this.state.set({
      entities: {},
      ids: []
    })
  }
}
