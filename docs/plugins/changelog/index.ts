import path from 'path';
import fs from 'fs-extra';
import pluginContentBlog, {BlogContent, PluginOptions} from '@docusaurus/plugin-content-blog';
import {aliasedSitePath, docuHash, normalizeUrl} from '@docusaurus/utils';
import {frontMatter} from "../elements/pages";
import {LoadContext, Plugin} from "@docusaurus/types";
const {validateOptions} = require("@docusaurus/plugin-content-blog");

/**
 * Multiple versions may be published on the same day, causing the order to be
 * the reverse. Therefore, our publish time has a "fake hour" to order them.
 */
const publishTimes = new Set();

/**
 * @param {string} section
 */
function processSection(section) {
  const title = section
    .match(/\n## .*/)?.[0]
    .trim()
    .replace('## ', '');
  if (!title) {
    return null;
  }
  const content = section
    .replace(/\n## .*/, '')
    .trim()
    .replace('running_woman', 'running');

  let hour = 20;
  const date = title.match(/ \((?<date>.*)\)/)?.groups.date;
  while (publishTimes.has(`${date}T${hour}:00`)) {
    hour -= 1;
  }
  publishTimes.add(`${date}T${hour}:00`);

  return {
    title: title.replace(/ \(.*\)/, ''),
    date,
    content: `${frontMatter({
      title: title.replace(/ \(.*\)/, ''),
      date: `${date}T${hour}:00`
    })}
# ${title.replace(/ \(.*\)/, '')}

<!-- truncate -->

${content.replace(/####/g, '##')}`,
  };
}

type Options = PluginOptions & {
  changelogPath: string
}

async function ChangelogPlugin(context: LoadContext, {changelogPath, ...options}: Options): Promise<Plugin<BlogContent>> {
  const generateDir = path.join(context.siteDir, 'changelog/source');
  const blogPlugin = await pluginContentBlog(context, {
    ...options,
    path: generateDir,
    id: 'changelog',
  });
  return {
    ...blogPlugin,
    name: 'changelog-plugin',
    async loadContent() {
      const fileContent = await fs.readFile(changelogPath, 'utf-8');
      const sections = fileContent
        .split(/(?=\n## )/)
        .map(processSection)
        .filter(Boolean);
      await Promise.all(
        sections.map((section) =>
          fs.outputFile(
            path.join(generateDir, `${section.title}.md`),
            section.content,
          ),
        ),
      );

      const content = await blogPlugin.loadContent();

      const postsPerPage = options.postsPerPage === 'ALL' ? content.blogPosts.length : options.postsPerPage;
      content.blogPosts.forEach((post, index) => {
        const pageIndex = Math.floor(index / postsPerPage);
        // @ts-ignore
        post.metadata.listPageLink = normalizeUrl([
          context.baseUrl,
          options.routeBasePath,
          pageIndex === 0 ? '/' : `/page/${pageIndex + 1}`,
        ]);
      });
      return content;
    },
    async contentLoaded({content, allContent, actions}) {
      const {setGlobalData, addRoute} = actions;
      // Create posts global data to be used by changelog widget
      setGlobalData({
        posts: content.blogPosts.slice(0,10) // Take up to 10 changes.
      });

      await blogPlugin.contentLoaded({content, allContent, actions});
    },
    configureWebpack(...args) {
      const config = blogPlugin.configureWebpack(...args);
      const pluginDataDirRoot = path.join(
        context.generatedFilesDir,
        this.name,
        options.id,
      );
      // Redirect the metadata path to our folder
      // @ts-ignore
      config.module.rules[0].use[1].options.metadataPath = (mdxPath) => {
        // Note that metadataPath must be the same/in-sync as
        // the path from createData for each MDX.
        const aliasedPath = aliasedSitePath(mdxPath, context.siteDir);
        return path.join(pluginDataDirRoot, `${docuHash(aliasedPath)}.json`);
      };
      return config;
    },
    getPathsToWatch() {
      // Don't watch the generated dir
      return [changelogPath];
    },
  };
}

ChangelogPlugin.validateOptions = ({validate, options}) => {
  const {changelogPath, ...blogOptions} = options
  const result = validateOptions({validate, options: blogOptions})
  return {changelogPath, ...result}
};
module.exports = ChangelogPlugin;