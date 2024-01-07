import {TestBed} from "@angular/core/testing"

import {CalendarEventApiService} from "./calendar-event-api.service"

describe("CalendarEventApiService", () => {
  let service: CalendarEventApiService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CalendarEventApiService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })
})
