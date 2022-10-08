import logger from "@docusaurus/logger"
import {LoadContext, Plugin} from "@docusaurus/types";

type Options = {
  path?: string
  origin?: string
}

/**
 * Due to CORS, API calls to different origins get blocked by the browser.
 * To be able to test and develop locally features that rely on external API a proxy can be configured.
 *
 * When working locally this plugin help proxy requests of versions.json to the online versions file
 */
export default function DevProxy(context: LoadContext, { path, origin }: Options): Plugin {
  if (!path || !origin) return { name: "webpack-dev-proxy-plugin" }

  return {
    name: "webpack-dev-proxy-plugin",
    configureWebpack() {
      logger.info(`Proxy requests matching ${path} to ${origin}`)

      return {
        mergeStrategy: { "devServer.proxy": "replace" },
        devServer: {
          proxy: {
            [path]: {
              target: origin,
              secure: true,
              changeOrigin: true,
              logLevel: "debug",
            },
          },
        },
      };
    },
  };
}
