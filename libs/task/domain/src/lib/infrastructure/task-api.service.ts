import {Injectable} from "@angular/core"
import {Either, fromPromise} from "@sweet-monads/either"
import PocketBaseClient from "pocketbase"

import {Task} from "../entities/task"
import {taskDtoToTaskMapper} from "../mappers/task-dto-to-task.mapper"

import {TASK_DTO_FIELDS, TaskDto} from "./dtos"

@Injectable({
  providedIn: "root"
})
export class TaskApiService {
  constructor(private pocketBaseClient: PocketBaseClient) {}

  public getFullList(): Promise<Either<Error, readonly Task[]>> {
    return fromPromise(
      this.pocketBaseClient
        .collection("events")
        .getFullList<TaskDto>({
          filter: "type = 'TASK'",
          sort: "-created",
          fields: TASK_DTO_FIELDS.join(",")
        })
        .then((tasks) => tasks.map(taskDtoToTaskMapper))
    )
  }
}
