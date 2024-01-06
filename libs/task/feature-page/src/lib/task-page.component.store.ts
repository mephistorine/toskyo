import {Injectable} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {RxState} from "@rx-angular/state"
import {map} from "rxjs"

type TaskPageComponentState = {
  loadingStatus: "pending" | "success" | "fail"
  openedTaskId: string | null
}

export const OPENED_TASK_ID_PARAM_KEY = "opened-task-id"

@Injectable()
export class TaskPageComponentStore extends RxState<TaskPageComponentState> {
  constructor(private activatedRoute: ActivatedRoute) {
    super()
    this.set({
      loadingStatus: "pending",
      openedTaskId: null
    })

    this.connect(
      "openedTaskId",
      this.activatedRoute.queryParamMap.pipe(
        map((param) => param.get(OPENED_TASK_ID_PARAM_KEY))
      )
    )
  }
}
