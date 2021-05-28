/// <reference types="@micra/application/lib/types/base-application" />
/// <reference types="@micra/application/lib/types/use" />
/// <reference types="@micra/application/lib/types/env" />
/// <reference types="@micra/application/lib/types/config" />

declare namespace Application {
  interface Services {
    'path/output': (...path: string[]) => string;
  }
}

