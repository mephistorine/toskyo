import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {rxState} from "@rx-angular/state"
import {rxEffects} from "@rx-angular/state/effects"
import {RxPush} from "@rx-angular/template/push"
import {left, right} from "@sweet-monads/either"
import {TuiSheetDialogService, TuiTouchableModule} from "@taiga-ui/addon-mobile"
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus"
import {produce} from "immer"
import PocketBaseClient from "pocketbase"
import {
  catchError,
  EMPTY,
  finalize,
  from,
  map,
  Observable,
  of,
  switchMap
} from "rxjs"
import {Task} from "task/domain"
import {TaskCardDialogComponent} from "task/feature-card-dialog"
import {TaskCardComponent} from "task/ui-card"

const OPENED_TASK_ID_PARAM_KEY = "opened-task-id"

type TaskPageComponentState = {
  loadingStatus: "pending" | "success" | "fail"
  tasks: Task[]
  openedTaskId: string | null
}

@Component({
  standalone: true,
  selector: "task-page",
  templateUrl: "./task-page.component.html",
  styleUrls: ["./task-page.component.css"],
  imports: [TaskCardComponent, TuiTouchableModule, RxPush],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPageComponent implements OnInit {
  private effects = rxEffects()
  private state = rxState<TaskPageComponentState>((state) => {
    state.set({
      loadingStatus: "pending",
      tasks: [],
      openedTaskId: null
    })

    state.connect(
      from(
        this.pocketBaseClient.collection("events").getFullList({
          filter: "type = 'TASK' && attributes.isCompleted = false",
          sort: "-created",
          fields: [
            "id",
            "created",
            "updated",
            "title",
            "content",
            "tags",
            "creatorUserId",
            "assigneeUserId",
            "isRecurring",
            "attributes"
          ].join(",")
        })
      ).pipe(
        map((tasks) => right(tasks)),
        catchError((error) => of(left(error)))
      ),
      (prevState, tasks) => {
        return produce(prevState, (draft) => {
          if (tasks.isLeft()) {
            draft.loadingStatus = "fail"
          } else {
            draft.tasks = tasks.unwrap().map((task) => {
              const {attributes, ...other} = task
              return {
                ...attributes,
                ...other
              }
            })
            draft.loadingStatus = "success"
          }
        })
      }
    )

    state.connect(
      "openedTaskId",
      this.activatedRoute.queryParamMap.pipe(
        map((param) => param.get(OPENED_TASK_ID_PARAM_KEY))
      )
    )
  })

  protected tasks: Observable<Task[]> = this.state.select("tasks")

  constructor(
    private pocketBaseClient: PocketBaseClient,
    private sheetDialogService: TuiSheetDialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.state.$.subscribe(console.debug)
  }

  public ngOnInit(): void {
    this.effects.register(
      this.state.$.pipe(
        switchMap((state) => {
          if (
            state.loadingStatus === "pending" ||
            state.loadingStatus === "fail"
          ) {
            return EMPTY
          }

          if (state.tasks.length <= 0 || state.openedTaskId === null) {
            return EMPTY
          }

          const task = state.tasks.find((t) => t.id === state.openedTaskId)

          return this.sheetDialogService
            .open(new PolymorpheusComponent(TaskCardDialogComponent), {
              data: task
            })
            .pipe(
              finalize(() => {
                this.router.navigate([], {
                  relativeTo: this.activatedRoute,
                  queryParams: {
                    [OPENED_TASK_ID_PARAM_KEY]: null
                  }
                })
              })
            )
        })
      )
    )
  }

  public onTaskContentClick(task: Task): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        [OPENED_TASK_ID_PARAM_KEY]: task.id
      }
    })
  }
}
