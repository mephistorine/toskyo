import {DATE_PIPE_DEFAULT_OPTIONS, DatePipeConfig} from "@angular/common"
import {Provider} from "@angular/core"

export function provideDatePipeDefaultOptions(
  config: DatePipeConfig
): Provider {
  return {
    provide: DATE_PIPE_DEFAULT_OPTIONS,
    useValue: config
  }
}
