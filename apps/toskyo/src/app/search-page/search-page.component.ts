import {ChangeDetectionStrategy, Component} from "@angular/core"
import {CommonModule} from "@angular/common"

/**
 * @deprecated
 */

@Component({
  selector: "tsk-search-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./search-page.component.html",
  styleUrl: "./search-page.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {}
