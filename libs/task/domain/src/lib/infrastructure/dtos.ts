export const TASK_DTO_FIELDS: readonly string[] = [
  "id",
  "created",
  "updated",
  "title",
  "content",
  "tags",
  "creatorUserId",
  "assigneeUserId",
  "isRecurring",
  "attributes.isCompleted",
  "attributes.dueDate",
  "attributes.parentTaskId"
]

export type TaskDto = {
  id: string
  created: string
  updated: string
  title: string
  content: string
  tags: string[]
  creatorUserId: string
  assigneeUserId: string
  isRecurring: boolean
  attributes: {
    parentTaskId: string | null
    isCompleted: boolean
    dueDate: string
  }
}
