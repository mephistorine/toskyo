import {CalendarEvent} from "../entities/calendar-event"
import {CalendarEventDto} from "../infrastructure/dtos"

export function calendarEventDtoToCalendarEventMapper(
  calendarEventDto: CalendarEventDto
): CalendarEvent {
  return {
    id: calendarEventDto.id,
    type: calendarEventDto.type,
    title: calendarEventDto.title,
    content: calendarEventDto.content,
    created: calendarEventDto.created,
    updated: calendarEventDto.updated,
    startDate: calendarEventDto.attributes.startDate,
    endDate: calendarEventDto.attributes.endDate,
    allDay: calendarEventDto.attributes.allDay,
    assigneeUserId: calendarEventDto.assigneeUserId,
    creatorUserId: calendarEventDto.creatorUserId,
    isRecurring: calendarEventDto.isRecurring,
    tags: calendarEventDto.tags
  }
}
