import {Task} from "../entities/task"
import {TaskDto} from "../infrastructure/dtos"

export function taskDtoToTaskMapper(taskDto: TaskDto): Task {
  return {
    id: taskDto.id,
    title: taskDto.title,
    content: taskDto.content,
    created: taskDto.created,
    updated: taskDto.updated,
    dueDate: taskDto.attributes.dueDate,
    isCompleted: taskDto.attributes.isCompleted,
    parentTaskId: taskDto.attributes.parentTaskId,
    assigneeUserId: taskDto.assigneeUserId,
    creatorUserId: taskDto.creatorUserId,
    isRecurring: taskDto.isRecurring,
    tags: taskDto.tags
  }
}
