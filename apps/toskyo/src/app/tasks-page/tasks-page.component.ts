import {CommonModule} from "@angular/common"
import {ChangeDetectionStrategy, Component, inject} from "@angular/core"
import {FormsModule} from "@angular/forms"
import {rxState} from "@rx-angular/state"
import {RxLet} from "@rx-angular/template/let"
import {TuiAppBarModule} from "@taiga-ui/addon-mobile"
import {TuiButtonModule, TuiLoaderModule} from "@taiga-ui/core"
import {TuiCheckboxBlockModule, TuiCheckboxLabeledModule} from "@taiga-ui/kit"
import PocketBaseClient from "pocketbase"

@Component({
  selector: "tsk-tasks-page",
  standalone: true,
  imports: [
    CommonModule,
    TuiAppBarModule,
    TuiCheckboxBlockModule,
    TuiLoaderModule,
    RxLet,
    TuiButtonModule,
    TuiCheckboxLabeledModule,
    FormsModule
  ],
  templateUrl: "./tasks-page.component.html",
  styleUrl: "./tasks-page.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPageComponent {
  private pocketBaseClient = inject(PocketBaseClient)

  protected tasksPageStore = rxState(({set}) => {
    set([])
  })

  constructor() {
    this.pocketBaseClient.collection("events").getFullList().then(console.debug)
  }
}
