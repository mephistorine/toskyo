import {Route} from "@angular/router"
import {CalendarEventsPageComponent} from "calendar-event/feature-page"
import {AppRoutes} from "shared/util-navigation"
import {TaskPageComponent} from "task/feature-page"

import {LoginPageComponent} from "./login-page/login-page.component"
import {ProfilePageComponent} from "./profile-page/profile-page.component"
import {RegisterPageComponent} from "./register-page/register-page.component"
import {SearchPageComponent} from "./search-page/search-page.component"

export const appRoutes: Route[] = [
  {
    path: AppRoutes.Tasks,
    component: TaskPageComponent,
    title: "Tasks"
  },
  {
    path: AppRoutes.CalendarEvents,
    component: CalendarEventsPageComponent,
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
    path: AppRoutes.Search,
    component: SearchPageComponent,
    title: "Search"
  },
  {
    path: "",
    redirectTo: AppRoutes.Tasks,
    pathMatch: "full"
  }
]
