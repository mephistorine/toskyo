import {animate, style, transition, trigger} from "@angular/animations"
import {ChangeDetectionStrategy, Component, NgZone, OnInit} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {rxEffects} from "@rx-angular/state/effects"
import {selectSlice} from "@rx-angular/state/selections"
import {RxPush} from "@rx-angular/template/push"
import {fromNullable} from "@sweet-monads/maybe"
import {TuiSheetDialogService, TuiTouchableModule} from "@taiga-ui/addon-mobile"
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus"
import isEmpty from "@tinkoff/utils/is/empty"
import objOf from "@tinkoff/utils/object/objOf"
import {EMPTY, finalize, map, Observable, switchMap, withLatestFrom} from "rxjs"
import {Task, TaskApiService, TaskService} from "task/domain"
import {TaskCardDialogComponent} from "task/feature-card-dialog"
import {TaskCardComponent} from "task/ui-card"

import {
  OPENED_TASK_ID_PARAM_KEY,
  TaskPageComponentStore
} from "./task-page.component.store"

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
  ],
  providers: [TaskPageComponentStore]
})
export class TaskPageComponent implements OnInit {
  private effects = rxEffects()

  protected tasks: Observable<Task[]> = this.taskService
    .selectAll()
    .pipe(map((tasks) => tasks.filter((t) => !t.isCompleted)))

  constructor(
    private sheetDialogService: TuiSheetDialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private taskApiService: TaskApiService,
    private taskPageComponentStore: TaskPageComponentStore,
    private ngZone: NgZone
  ) {
    this.effects.register(this.taskPageComponentStore.select(), (d) =>
      console.log("taskPageComponentStore", d)
    )
    this.effects.register(this.taskService.selectAll(), (d) =>
      console.log("taskService", d)
    )
  }

  public ngOnInit(): void {
    this.effects.register(this.taskApiService.getFullList(), (result) => {
      if (result.isLeft()) {
        console.error(result.unwrap())
        return
      }

      this.taskService.insertMany(result.unwrap())
      this.taskPageComponentStore.set({loadingStatus: "success"})
    })

    this.effects.register(
      this.taskPageComponentStore.$.pipe(
        selectSlice(["openedTaskId", "loadingStatus"]),
        withLatestFrom(this.taskService.selectEntities()),
        switchMap(([{loadingStatus, openedTaskId}, taskById]) => {
          if (loadingStatus === "pending" || loadingStatus === "fail") {
            return EMPTY
          }

          if (isEmpty(taskById) || openedTaskId === null) {
            return EMPTY
          }

          const task = fromNullable(taskById[openedTaskId])

          return this.sheetDialogService
            .open(new PolymorpheusComponent(TaskCardDialogComponent), {
              data: task.unwrap()
            })
            .pipe(
              finalize(() => {
                this.router.navigate([], {
                  relativeTo: this.activatedRoute,
                  queryParams: objOf(OPENED_TASK_ID_PARAM_KEY, null)
                })
              })
            )
        })
      )
    )
  }

  public onTaskContentClick(id: string): void {
    this.ngZone.run(() => {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: objOf(OPENED_TASK_ID_PARAM_KEY, id)
      })
    })
  }

  public onTaskCheckoutClick(task: Task): void {
    this.taskService.patch({
      id: task.id,
      changes: {
        isCompleted: true
      }
    })
  }
}
