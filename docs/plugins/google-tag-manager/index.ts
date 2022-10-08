import type {LoadContext, Plugin} from '@docusaurus/types';

export type Options = {
  gtmID: string;
};

export default function pluginGoogleTagManager(context: LoadContext, options: Options): Plugin {
  const {gtmID} = options;

  return {
    name: 'docusaurus-plugin-google-tag-manager',

    injectHtmlTags() {
      if (!gtmID) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: 'https://www.googletagmanager.com',
            },
          },
          {
            tagName: 'script',
            innerHTML: `// Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmID}');`,
          },
        ],
        preBodyTags: [
          {
            tagName: 'noscript',
            innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }
        ]
      };
    },
  };
}
