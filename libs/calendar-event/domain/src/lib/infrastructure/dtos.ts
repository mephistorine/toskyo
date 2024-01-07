export const CALENDAR_EVENT_DTO_FIELDS: readonly string[] = [
  "id",
  "created",
  "updated",
  "title",
  "content",
  "tags",
  "creatorUserId",
  "assigneeUserId",
  "isRecurring",
  "attributes.startDate",
  "attributes.endDate",
  "attributes.allDay"
]

export type CalendarEventDto = {
  id: string
  type: "CALENDAR_EVENT"
  created: string
  updated: string
  title: string
  content: string
  tags: string[]
  creatorUserId: string
  assigneeUserId: string
  isRecurring: boolean
  attributes: {
    startDate: string
    endDate: string | null
    allDay: boolean
  }
}
