export class CLIRequest<A extends Record<string, any> = Record<string, any>, O extends Record<string, any> = Record<string, any>> {
  public options: O;
  public arguments: A;

  constructor(args?: A, options?: O) {
    this.arguments = args || {} as A;
    this.options = options || {} as O;
  }
}
