import {CommonModule} from "@angular/common"
import {HttpClient} from "@angular/common/http"
import {ChangeDetectionStrategy, Component} from "@angular/core"
import {RxLet} from "@rx-angular/template/let"
import {TuiAppBarModule} from "@taiga-ui/addon-mobile"
import {TuiLoaderModule} from "@taiga-ui/core"
import {TuiCheckboxBlockModule} from "@taiga-ui/kit"
import {map} from "rxjs"

@Component({
  selector: "tsk-tasks-page",
  standalone: true,
  imports: [
    CommonModule,
    TuiAppBarModule,
    TuiCheckboxBlockModule,
    TuiLoaderModule,
    RxLet
  ],
  templateUrl: "./tasks-page.component.html",
  styleUrl: "./tasks-page.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPageComponent {
  constructor(private httpClient: HttpClient) {}

  protected episodes = this.httpClient
    .get<{results: Record<string, unknown>[]}>(
      "https://rickandmortyapi.com/api/episode"
    )
    .pipe(
      map((response) => {
        return response.results
      })
    )
}
