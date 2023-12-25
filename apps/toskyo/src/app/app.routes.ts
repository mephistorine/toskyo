import {Route} from "@angular/router"

import {EventsPageComponent} from "./events-page/events-page.component"
import {ProfilePageComponent} from "./profile-page/profile-page.component"
import {TasksPageComponent} from "./tasks-page/tasks-page.component"

export const appRoutes: Route[] = [
  {
    path: "tasks",
    component: TasksPageComponent,
    title: "Tasks"
  },
  {
    path: "events",
    component: EventsPageComponent,
    title: "Events"
  },
  {
    path: "profile",
    component: ProfilePageComponent,
    title: "Profile"
  },
  {
    path: "",
    redirectTo: "tasks",
    pathMatch: "full"
  }
]
