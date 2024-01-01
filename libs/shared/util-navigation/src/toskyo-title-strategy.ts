import {Injectable} from "@angular/core"
import {Title} from "@angular/platform-browser"
import {RouterStateSnapshot, TitleStrategy} from "@angular/router"

@Injectable({providedIn: "root"})
export class ToskyoTitleStrategy extends TitleStrategy {
  constructor(private readonly titleService: Title) {
    super()
  }

  override updateTitle(snapshot: RouterStateSnapshot) {
    const title = this.buildTitle(snapshot)
    if (typeof title === "string" && title.length > 0) {
      this.titleService.setTitle(`${title} · Toskyo`)
    }
  }
}
