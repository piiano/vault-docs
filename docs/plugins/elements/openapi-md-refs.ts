/**
 * By default, OpenAPI don't allow referencing external text files but only other YAML/JSON files.
 * For a more convenient management of the API documentation, it's often desired to extract markdown and other textual
 * content to external files.
 *
 * We allow loading external text files using extensions prefixed with `x-text-ref-`.
 *
 * The plugin traverses the spec looking for the extension in the following form:
 * ```yaml
 * x-text-ref-<prop-name>: <file-path>
 * ```
 * For each occurrence of the extension it replaces the extension in the yaml with the prop name and file content as follows:
 * ```yaml
 * <prop-name>: <file-content>
 * ```
 *
 * Example:
 *
 * Having a markdown file `./content.md` with the content "External API Description!"
 * And having in the spec the extension property `x-md-ref-description: './content.md'`
 *
 * The final spec will have `"description": "External API Description!"`
 */

import {promises} from 'fs';
import {join} from 'path';

const markdownRefExtensionPropPrefix = 'x-text-ref-';

type JSONValue = string | number | boolean | null | Array<JSONValue> | { [key:string]: JSONValue }

export async function resolveMarkdownRefExtensions(value: JSONValue, contentDir: string): Promise<JSONValue> {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value
  }
  if (Array.isArray(value)) {
    return await Promise.all(value.map(v => resolveMarkdownRefExtensions(v, contentDir)))
  }
  return Object.fromEntries(await Promise.all(Object.entries(value).map(async ([key, v]) => {
    if (key.startsWith(markdownRefExtensionPropPrefix) && typeof v === 'string') {
      const newKey = key.slice(markdownRefExtensionPropPrefix.length)
      const newValue = await promises.readFile(join(contentDir, v), 'utf8')
      return [newKey, newValue]
    }
    return [key, await resolveMarkdownRefExtensions(v, contentDir)]
  })))
}
