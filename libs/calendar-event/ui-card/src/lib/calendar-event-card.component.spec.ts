import {ComponentFixture, TestBed} from "@angular/core/testing"

import {CalendarEventCardComponent} from "./calendar-event-card.component"

describe("CardComponent", () => {
  let component: CalendarEventCardComponent
  let fixture: ComponentFixture<CalendarEventCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEventCardComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(CalendarEventCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
