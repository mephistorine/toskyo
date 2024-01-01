import {CommonModule} from "@angular/common"
import {ChangeDetectionStrategy, Component} from "@angular/core"
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms"
import {RxPush} from "@rx-angular/template/push"
import {TuiButtonModule, TuiErrorModule} from "@taiga-ui/core"
import {
  TuiComboBoxModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule
} from "@taiga-ui/kit"

@Component({
  selector: "tsk-register-page",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxPush,
    TuiButtonModule,
    TuiComboBoxModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule
  ],
  templateUrl: "./register-page.component.html",
  styleUrl: "./register-page.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
  protected readonly form = this.formBuilder.nonNullable.group({
    username: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    passwordConfirm: ["", Validators.required]
  })

  constructor(private readonly formBuilder: FormBuilder) {}

  protected onFormSubmit(): void {
    if (this.form.invalid) {
      return
    }

    // this.authDataService.register(this.form.value as any).subscribe()
  }
}
