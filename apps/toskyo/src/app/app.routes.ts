import {Route} from "@angular/router"
import {AppRoutes} from "shared/util-common"

import {EventsPageComponent} from "./events-page/events-page.component"
import {LoginPageComponent} from "./login-page/login-page.component"
import {ProfilePageComponent} from "./profile-page/profile-page.component"
import {RegisterPageComponent} from "./register-page/register-page.component"
import {TasksPageComponent} from "./tasks-page/tasks-page.component"

export const appRoutes: Route[] = [
  {
    path: AppRoutes.Tasks,
    component: TasksPageComponent,
    title: "Tasks"
  },
  {
    path: AppRoutes.Events,
    component: EventsPageComponent,
    title: "Events"
  },
  {
    path: AppRoutes.Profile,
    component: ProfilePageComponent,
    title: "Profile"
  },
  {
    path: AppRoutes.Login,
    component: LoginPageComponent,
    title: "Login",
    data: {
      tabBarEnabled: false
    }
  },
  {
    path: AppRoutes.Register,
    component: RegisterPageComponent,
    title: "Register",
    data: {
      tabBarEnabled: false
    }
  },
  {
    path: "",
    redirectTo: AppRoutes.Tasks,
    pathMatch: "full"
  }
]
