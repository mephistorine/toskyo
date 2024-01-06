import {Injectable} from "@angular/core"
import {Either, left, right} from "@sweet-monads/either"
import PocketBaseClient from "pocketbase"
import {catchError, from, map, Observable, of} from "rxjs"

import {Task} from "../entities/task"
import {taskDtoToTaskMapper} from "../mappers/task-dto-to-task.mapper"

import {TASK_DTO_FIELDS, TaskDto} from "./dtos"

@Injectable({
  providedIn: "root"
})
export class TaskApiService {
  constructor(private pocketBaseClient: PocketBaseClient) {}

  public getFullList(): Observable<Either<Error, readonly Task[]>> {
    return from(
      this.pocketBaseClient.collection("events").getFullList<TaskDto>({
        filter: "type = 'TASK'",
        sort: "-created",
        fields: TASK_DTO_FIELDS.join(",")
      })
    ).pipe(
      map((tasks) => tasks.map(taskDtoToTaskMapper)),
      map(right),
      catchError((error) => of(left(error)))
    )
  }
}
