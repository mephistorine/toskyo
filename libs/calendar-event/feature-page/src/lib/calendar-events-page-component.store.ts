import {RxState} from "@rx-angular/state"
import {TuiDay} from "@taiga-ui/cdk"

export type CalendarEventsPageComponentState = {
  selectedDate: TuiDay | null
}

export class CalendarEventsPageComponentStore extends RxState<CalendarEventsPageComponentState> {
  constructor() {
    super()
    this.set({
      selectedDate: TuiDay.fromLocalNativeDate(new Date())
    })
  }
}
