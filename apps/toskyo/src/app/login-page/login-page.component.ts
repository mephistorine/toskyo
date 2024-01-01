import {CommonModule} from "@angular/common"
import {ChangeDetectionStrategy, Component, signal} from "@angular/core"
import {takeUntilDestroyed} from "@angular/core/rxjs-interop"
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms"
import {Router} from "@angular/router"
import {RxPush} from "@rx-angular/template/push"
import {TuiAlertService, TuiButtonModule, TuiErrorModule} from "@taiga-ui/core"
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule
} from "@taiga-ui/kit"
import PocketBaseClient from "pocketbase"

type LoginPageForm = {
  username: string
  password: string
}

@Component({
  selector: "tsk-login-page",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiInputPasswordModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    RxPush
  ],
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  protected readonly loginIsProcessing = signal(false)
  protected readonly form = this.formBuilder.nonNullable.group({
    username: ["", Validators.required],
    password: ["", [Validators.required, Validators.minLength(8)]]
  })

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pocketBaseClient: PocketBaseClient,
    private readonly router: Router,
    private readonly alertService: TuiAlertService
  ) {}

  protected onFormSubmit(): void {
    if (this.form.invalid) {
      return
    }

    this.loginIsProcessing.set(true)

    const form = this.form.value as LoginPageForm

    this.pocketBaseClient
      .collection("users")
      .authWithPassword(form.username, form.password)
      .then(() => this.router.navigateByUrl("/"))
      .catch(() => {
        this.alertService
          .open("Login failed")
          .pipe(takeUntilDestroyed())
          .subscribe()
      })
      .finally(() => this.loginIsProcessing.set(false))
  }
}
