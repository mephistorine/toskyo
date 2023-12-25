# Toskyo

## Сущности

- Задача
- Событие
- Комментарий
- Списки (Проекты)
- Метка

```typescript
// Схема базы данных

type BaseEventEntity = {
  id: string
  created: string
  updated: string
  title: string
  content: string
  tags: string[]
  creatorId: string
  assigneeId: string
  isRecurring: boolean
}

type TaskEntity = {
  parentId: string | null
  isCompleted: boolean
  dueDate: string
}

type EventEntity = {
  startDate: string
  endDate: string | null
  allDay: boolean
}
```
