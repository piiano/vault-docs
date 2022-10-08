import fs from 'fs-extra';
import yaml from 'yaml';
import { formatOpenAPISpec } from './openapi-formatter';
import { resolveMarkdownRefExtensions } from './openapi-md-refs';
import pluginContentDocs, {type PluginOptions, type LoadedContent} from '@docusaurus/plugin-content-docs';
import {slugify} from "@stoplight/elements-core";
import {join,relative,resolve} from "path";
import { ProvidePlugin } from 'webpack';
import type { LoadContext, Plugin } from '@docusaurus/types'
import {apiCategoryPage, apiPage} from "./pages";
import {OpenAPISpec} from "../../src/components/elements/openapi";
import {specRoutes} from "./openapi-routes";

const {validateOptions} = require("@docusaurus/plugin-content-docs");

type ElementsPluginOptions = PluginOptions & {
  openapiFile: string
  openapiReferencesDir: string
  exportOpenAPI?: Array<string>
}
type ElementsPluginContent = LoadedContent & {openapiSpec?: OpenAPISpec}

export const pluginName = 'docusaurus-plugin-elements'

let loaded = false

/**
 * When working locally this plugin help proxy requests of versions.json to the online versions file
 */
async function ElementsPlugin(
  context: LoadContext,
  options: ElementsPluginOptions
): Promise<Plugin<ElementsPluginContent>> {
  const { siteDir, generatedFilesDir } = context
  const { openapiFile, openapiReferencesDir, exportOpenAPI, ...docsOptions } = options;
  const { path, exclude = [] } = docsOptions
  const generatedAPIPagesDir = join(generatedFilesDir, pluginName, 'generated')
  await fs.mkdir(generatedAPIPagesDir, {recursive: true})
  if (!loaded) {
    await fs.emptyDir(generatedAPIPagesDir)
    loaded = true
  }
  // init the docusaurus content-docs plugin
  const docsPlugin = await pluginContentDocs(context, {
    ...docsOptions,
    path: generatedAPIPagesDir,
    exclude: [
      ...exclude,
      // exclude the content dir
      `${relative(join(siteDir, path), openapiReferencesDir)}/**`
    ],
  });
  const { configureWebpack, getPathsToWatch, loadContent, getTranslationFiles, translateContent, contentLoaded } = docsPlugin

  return {
    ...docsPlugin,
    configureWebpack(config, isServer, utils, content) {
      const urlSearchPoly = isServer ? { URLSearchParams: ["url", "URLSearchParams"] } : {}
      const webpackConfiguration = configureWebpack(config, isServer, utils, content)

      return {
        ...webpackConfiguration,
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false,
              },
            },
            ...(webpackConfiguration.module.rules),
          ],
        },
        plugins: [
          new ProvidePlugin({
            process: 'process/browser',
            ...urlSearchPoly,
          }),
        ],
        resolve: {
          alias: {
            ...webpackConfiguration.resolve.alias,
            fastestsmallesttextencoderdecoder: "fastestsmallesttextencoderdecoder/EncoderDecoderTogether.min"
          },
          fallback: {
            stream: false,
            path: false,
            process: false,
            url: require.resolve("url")
          },
        },
      };
    },
    getPathsToWatch() {
      return [
        // paths to watch of the content-docs plugin
        //   ...getPathsToWatch(),
        ...(getPathsToWatch().map(pathToWatch =>
          // exclude generated files.
          pathToWatch.replace(generatedAPIPagesDir, join(siteDir, path)))),
        // watch openapi file for changes
        resolve(siteDir, openapiFile),
        // watch openapi references dir for changes even though it's excluded
        `${resolve(siteDir, openapiReferencesDir)}/**`,
      ];
    },
    async loadContent() {
      await fs.copy(join(siteDir, path), generatedAPIPagesDir, {
        recursive: true,
        overwrite: true,
      })

      const parse = /\.ya?ml$/.test(openapiFile) ? yaml.parse : JSON.parse;
      const file = fs.readFileSync(openapiFile).toString();

      let openapiSpec = parse(file);
      openapiSpec = formatOpenAPISpec(openapiSpec)
      openapiSpec = await resolveMarkdownRefExtensions(openapiSpec, resolve(siteDir, openapiReferencesDir))

      const routes = specRoutes(openapiSpec)

      const generatedFiles: Record<string, string> = {}
      const sidebarItems = (await fs.readdir(join(siteDir, path))).length
      // for each category (tag) create `index.md` and `_category_.yaml` in the tag folder.
      openapiSpec.tags.forEach((tag, tagIndex) => {
        const tagSlug = slugify(tag.name.toLowerCase())
        generatedFiles[`${tagSlug}/_category_.yaml`] = yaml.stringify({label: tag.name, position: sidebarItems + tagIndex})
        generatedFiles[`${tagSlug}/index.md`] = apiCategoryPage(tag)
      })

      // counters for preserving the sidebar positions for each route in each category (tag).
      const tagsSidebarPositions = Object.fromEntries(openapiSpec.tags.map(tag => [tag.name, 0]))
      // for each operation add an .mdx page to each of the tags it has.
      routes.forEach(route => route.tags.forEach(tag =>
        generatedFiles[`${slugify(tag.toLowerCase())}/${route.id}.mdx`] = apiPage(route, tagsSidebarPositions[tag]++)
      ));

      // add each file to the `generated` folder to be read and processed by the content-docs plugin.
      await Promise.all(Object.entries(generatedFiles).map(([filePath, data]) =>
        fs.outputFile(join(generatedFilesDir, pluginName, 'generated', filePath), data)))

      await Promise.all((exportOpenAPI ?? []).map(exportFile => {
        const stringify = /\.ya?ml$/.test(exportFile) ? yaml.stringify : (value) => JSON.stringify(value, null, 2);
        return fs.outputFile(join(siteDir, exportFile), stringify(openapiSpec))
      }))

      // load content by the content-docs plugin
      const docsContent = await loadContent()

      // pass the loaded content to the next steps
      return {openapiSpec, ...docsContent};
    },
    getTranslationFiles: ({content}) => {
      // exclude the spec from content-docs plugin getTranslationFiles
      const {openapiSpec, ...docsContent} = content
      return getTranslationFiles({content: docsContent})
    },
    translateContent: ({content, translationFiles}) => {
      // exclude the spec from content-docs plugin translateContent
      const {openapiSpec, ...docsContent} = content
      return {
        openapiSpec,
        ...(translateContent({content: docsContent, translationFiles}))
      }
    },
    async contentLoaded({content, allContent, actions }) {
      const {openapiSpec, ...docsContent} = content;
      const {setGlobalData} = actions;

      // call the contentLoaded method of the content-docs plugin to create some docusaurus metadata
      await contentLoaded({content: docsContent, allContent, actions})

      // hack: add the openapi spec to global data without overriding the global data added by the original content-docs plugin
      this.name = pluginName
      setGlobalData({openapiSpec})
    },
  }
}

ElementsPlugin.validateOptions = ({validate, options}: {validate, options: ElementsPluginOptions}) => {
  const {openapiFile, openapiReferencesDir, exportOpenAPI, ...docsOptions} = options

  const result = validateOptions({validate, options: docsOptions})
  return {openapiFile, openapiReferencesDir, exportOpenAPI, ...result}
};

module.exports = ElementsPlugin
