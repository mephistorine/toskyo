import {Injectable} from "@angular/core"
import {RxState} from "@rx-angular/state"
import {EntityState, EntityStateController} from "shared/util-state"

import { Task } from '../entities/task';

type TaskServiceState = EntityState<Task>

@Injectable({
  providedIn: "root"
})
export class TaskService extends EntityStateController<Task> {
  constructor() {
    super(new RxState<TaskServiceState>())
    this.state.set({
      entities: {},
      ids: []
    })
  }
}
