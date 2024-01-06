import {animate, style, transition, trigger} from "@angular/animations"
import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {rxState} from "@rx-angular/state"
import {rxEffects} from "@rx-angular/state/effects"
import {RxPush} from "@rx-angular/template/push"
import {TuiSheetDialogService, TuiTouchableModule} from "@taiga-ui/addon-mobile"
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus"
import {produce} from "immer"
import {EMPTY, finalize, map, Observable, switchMap} from "rxjs"
import {Task, TaskApiService, TaskService} from "task/domain"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("taskLeave", [
      transition(
        ":leave",
        [
          style({transform: "translateX(0)"}),
          animate(
            "300ms 300ms ease-in-out",
            style({transform: "translateX(-100%)"})
          )
        ],
        {params: {duration: 300}}
      )
    ])
  ]
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
      "openedTaskId",
      this.activatedRoute.queryParamMap.pipe(
        map((param) => param.get(OPENED_TASK_ID_PARAM_KEY))
      )
    )
  })

  protected tasks: Observable<Task[]> = this.state
    .select("tasks")
    .pipe(map((tasks) => tasks.filter((t) => !t.isCompleted)))

  constructor(
    private sheetDialogService: TuiSheetDialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private taskApiService: TaskApiService
  ) {
    this.state.$.subscribe(console.debug)
  }

  public ngOnInit(): void {
    this.effects.register(this.taskApiService.getFullList(), (result) => {
      if (result.isLeft()) {
        console.error(result.unwrap())
        return
      }

      this.taskService.insertMany(result.unwrap())
    })

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

  public onTaskContentClick(id: string): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        [OPENED_TASK_ID_PARAM_KEY]: id
      }
    })
  }

  public onTaskCheckoutClick(task: Task): void {
    this.state.set((state) => {
      return produce(state, (draft) => {
        const t = draft.tasks.find((t) => t.id === task.id)
        if (t) {
          t.isCompleted = true
        }
      })
    })

    /*this.pocketBaseClient.collection("events").update(
      task.id,
      {
        attributes: {
          dueDate: task.dueDate,
          parentTaskId: task.parentTaskId,
          isCompleted: true
        }
      },
      {
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
      }
    ).then((newTask) => {
      const {attributes, ...other} = newTask
      return {
        ...attributes,
        ...other
      }
    })
      .then((newTask: Task) => {
        this.state.set((state) => {
          return produce(state, (draft) => {
            const i = draft.tasks.findIndex(t => t.id === newTask.id)
            draft.tasks[i] = newTask
          })
        })
      })*/
  }
}
