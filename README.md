# Toskyo

## Сущности

- Задача
- Событие
- Комментарий
- Списки (Проекты)
- Метка

## Схема данных

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

type TaskEntity = BaseEventEntity & {
  parentId: string | null
  isCompleted: boolean
  dueDate: string
}

type EventEntity = BaseEventEntity & {
  startDate: string
  endDate: string | null
  allDay: boolean
}
```

## Функциональность

- Создавать/Редактировать/Удалять задачи
- Создавать/Редактировать/Удалять события
- Отображение задач и событий
