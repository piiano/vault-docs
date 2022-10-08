import React from 'react';
import CodeBlock, {Props as CodeBlockProps} from '@theme/CodeBlock';
import {usePluginData} from "@docusaurus/useGlobalData";
import {Guide} from "@site/plugins/guide-snippets/guide";

type QualifiedCommandKey = `commands.${string}`
type QualifiedOutputKey = `outputs.${string}`
type QualifiedKey = QualifiedCommandKey | QualifiedOutputKey
type ContentOptions = { guide: string, variables?: object } & ({ command: string } | { output: string } | { keys: Array<QualifiedKey> })
type Props = Omit<CodeBlockProps, 'children'> & ContentOptions;

type GuidesPluginData = {
  guides: Record<string, {
    commands: Record<string, string>
    outputs: Record<string, string>
  }>,
  staticVariables: object
}

function extractContent(pluginData: GuidesPluginData, options: ContentOptions): string {
  const variables = {
    ...(pluginData?.staticVariables ?? {}),
    ...(options?.variables ?? {})
  }
  const serializedGuide = pluginData?.guides?.[options.guide]
  const guide = new Guide(serializedGuide.commands, serializedGuide.outputs)

  if (!guide) {
    throw new Error(`missing guide "${options.guide}".`)
  }
  if ('keys' in options) {
    return options.keys.map(key => {
      const parsedCommand = key.split('.')
      if (parsedCommand.length !== 2) {
        throw new Error(`invalid key "${key}".`)
      }
      const [category, shortKey] = parsedCommand
      if (category ==='outputs') {
        return extractContent(pluginData, { guide: options.guide, output: shortKey, variables: options.variables })
      }
      if (category ==='commands') {
        return extractContent(pluginData, { guide: options.guide, command: shortKey, variables: options.variables })
      }
      throw new Error(`invalid key "${key}".`)
    }).join('\n')
  }
  const query = 'command' in options ? {
    value: guide.command?.(options.command, variables),
    from: 'commands',
    key: options.command
  }: {
    value: guide.output?.(options.output, variables),
    from: 'outputs',
    key: options.output
  }
  if (!query.value) {
    throw new Error(`missing key "${query.key}" in ${query.from} of guide "${options.guide}".`)
  }
  return query.value;
}

function GuideSnippet({language = 'bash', ...props}: Props) {
  const guidesPlugin = usePluginData('guide-snippets-plugin', 'guide-snippets') as GuidesPluginData;
  const content = extractContent(guidesPlugin, props)

  return <CodeBlock {...props} language={language}>{content}</CodeBlock>;
}

export default GuideSnippet;