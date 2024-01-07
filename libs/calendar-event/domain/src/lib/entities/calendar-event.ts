export type CalendarEvent = {
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
  startDate: string
  endDate: string | null
  allDay: boolean
}
