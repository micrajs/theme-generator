declare namespace Application {
  interface Services {
    cli: import('app/cli/CLIAssistant').CLIAssistant;
    request: import('app/cli/CLIRequest').CLIRequest;
  }
}
