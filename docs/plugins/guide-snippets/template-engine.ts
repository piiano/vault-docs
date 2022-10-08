import {inspect} from 'util'

// match template variables in the form of '${{ varName }}'. don't match if precede with an escaping slash '\'.
export const templateVariable = /((?<!\\)\$\{\{ *(?<varName>[a-zA-Z0-9_]+) *}})/g

export function parseTemplate(template: string, variables = {}, verbose = true): string {
  return template.replace(templateVariable, (m, varOccurrence: string, varName: string, i: number) => {
    if (!(varName in variables)) {
      if (verbose) {
        printTemplateError(template, variables, varName, varOccurrence, i);
      }
      throw new Error(`missing variable key "${varName}" for template variable "${varOccurrence}.`)
    }
    return variables[varName]
  })
}

const cyan = (str: string): string => `\u001b[36m${str}\u001b[0m`
const red = (str: string): string => `\u001b[31m${str}\u001b[0m`
const gray = (str: string): string => `\u001b[37m${str}\u001b[0m`

function printTemplateError(template: string, variables: object, varName: string, varOccurrence: string, index: number) {
  const beforeMissing = template.slice(0, index).replace(templateVariable, gray)
  const missing = red(varOccurrence)
  const afterMissing = template.slice(index+varOccurrence.length).replace(templateVariable, gray)

  const message = `
${red(`Missing variable key "${varName}" for template variable "${varOccurrence}".)`)}

\`\`\`${cyan('template')}
${beforeMissing}${missing}${afterMissing}
\`\`\`

\`\`\`${cyan('variables')}
${inspect(variables, {colors: true, compact: false})}
\`\`\``

  console.log(message)
}
