import type {LoadContext, Plugin} from "@docusaurus/types";
import fs from "fs-extra";
import {basename, join} from "path";
import {parseGuideFile} from "./guide-parser";
import {Guide} from "./guide";

type Options = {
  guidesPath: string
  vars: object
}

function GuideSnippetsPlugin(context: LoadContext, {guidesPath, vars}: Options): Plugin<Record<string, Guide>> {
  return {
    name: 'guide-snippets-plugin',
    async loadContent() {
      const guideFiles = await fs.readdir(guidesPath, 'utf-8');
      return Object.fromEntries(await Promise.all(
        guideFiles.map(async guideFile => [
          basename(guideFile, '.template'),
          await parseGuideFile(join(guidesPath, guideFile))
        ])
      ));
    },
    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      // Create guides global data to be used by GuideSnippet component
      setGlobalData({ guides: content, staticVariables: vars });
    },
    getPathsToWatch() {
      return [guidesPath];
    },
  };
}

module.exports = GuideSnippetsPlugin;