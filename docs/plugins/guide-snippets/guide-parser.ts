import {Guide} from "./guide";
import {scriptRunnerFactory} from "./script-runner";
import {promises} from "fs";

// match command annotation (#command:commandName) and the following command.
const commandsRegex = /^#\s*[Cc]ommand:\s*(?<commandKey>[a-zA-Z0-9_-]+)\s*\n(?<command>([^\n]+\n)+)$/gm
// match output annotation (#output:commandName) and the following commented output.
const outputsRegex = /^#\s*[Oo]utput:\s*(?<outputKey>[a-zA-Z0-9_-]+)\s*\n(?<output>(#.*\n)+)$/gm

export async function parseGuideFile(file: string): Promise<Guide> {
  const guideTemplate = await promises.readFile(file, 'utf8')
  const commands = parseCommands(guideTemplate)
  const outputs = parseOutputs(guideTemplate)
  const runner = scriptRunnerFactory(guideTemplate)
  return new Guide(commands, outputs, runner)
}

export function parseCommands(guideContent: string): Record<string, string> {
  let match
  const commands = {}
  while (match = commandsRegex.exec(guideContent)) {
    commands[match.groups.commandKey] = match.groups.command.trim()
  }
  return commands
}

export function parseOutputs(guideContent: string): Record<string, string> {
  let match
  const outputs = {}
  while (match = outputsRegex.exec(guideContent)) {
    outputs[match.groups.outputKey] = match.groups.output.replace(/^#/gm,'').trimEnd()
  }
  return outputs
}
