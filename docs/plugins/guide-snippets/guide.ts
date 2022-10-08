
import {parseTemplate} from "./template-engine";
import {ExecOptions} from "child_process";

export class Guide {
  constructor(
    readonly commands: Record<string, string>,
    readonly outputs: Record<string, string>,
    readonly run: ((variables: object, options: ExecOptions) => Promise<string>) = (async () => '')) {}

  output(key: string, variables: object): string {
    return parseTemplate(this.outputs[key], variables);
  }
  command(key: string, variables: object): string {
    return parseTemplate(this.commands[key], variables);
  }
  aggregatedOutputs(variables: object): string {
    return parseTemplate(Object.values(this.outputs).join('\n'), variables);
  }
}
