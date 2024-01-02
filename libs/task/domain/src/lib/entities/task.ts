export type Task = {
  id: string
  created: string
  updated: string
  title: string
  content: string
  tags: string[]
  creatorUserId: string
  assigneeUserId: string
  isRecurring: boolean
  parentTaskId: string | null
  isCompleted: boolean
  dueDate: string
}
