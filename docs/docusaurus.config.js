// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require('path')
const logger = require("@docusaurus/logger");
require('@swc-node/register')


const lightCodeTheme = require('prism-react-renderer/themes/github');

/** @type {import('prism-react-renderer').PrismTheme} */
// @ts-ignore
const draculaTheme = require('prism-react-renderer/themes/dracula');

const darkCodeTheme = {
    ...draculaTheme,
    // fix contrast of comments colors in the dracula theme
    styles: draculaTheme.styles.map(style =>
        style.types.includes('comment') ? { ...style, style: { color: "rgb(138 170 231)" } } : style)
}

const isOnlineBuild = process.env.BUILD_FOR_ONLINE === 'true';
const vaultVersion = process.env.VAULT_VERSION;
const dockerTag = process.env.DOCKER_TAG;
const registry = process.env.REGISTRY ?? 'piiano';
const vaultVersionsURL = parseURLSafely(process.env.VAULT_VERSIONS_API_URL)
const vaultVersionsPath = vaultVersionsURL?.pathname
const vaultVersionsOrigin = vaultVersionsURL?.origin
const currentDocsBasePath = path.join('/', process.env.DOCS_BASE_PATH ?? '')
const homeUrl = process.env.ONLINE_DOCS_URL ?? 'https://piiano.com'
const basicAuthEnabled = process.env.ENABLE_WEBSITE_BASIC_AUTH

const authDomain = process.env.WEBSITE_OAUTH_DOMAIN;
const authClientId = process.env.WEBSITE_OAUTH_CLIENT_ID;

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Piiano',
    tagline: 'Privacy is cool',
    url: process.env.DOCS_URL || homeUrl,
    baseUrl: path.join(currentDocsBasePath, '/'),
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'piiano',
    projectName: 'piiano-vault',
    customFields: {
        docsURL: process.env.DOCS_URL || 'http://localhost:8123',
        isOnlineBuild,
        dockerTag,
        vaultVersion,
        currentDocsBasePath,
        vaultVersionsPath,
        basicAuthEnabled,
        // When ENABLE_PRIVACY_POPUP exists use it to enable or disable the popup when it has truthy or falsy value respectively.
        // If not provided, fallback to existence of GTM_ID (when we have Google Analytics we want to show the popup).
        enablePrivacyPopup: Boolean(process.env.ENABLE_PRIVACY_POPUP ?? process.env.GTM_ID),
        // Auth / registration.
        authDomain,
        authClientId,
    },

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    path: 'docs',
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                    versions: {
                        current: {
                            label: 'v' + vaultVersion
                        }
                    }
                },
                theme: {
                    customCss: [
                        require.resolve('./src/css/custom.css'),
                        ...(process.env.BUILD_FOR_ONLINE === 'true' ? [require.resolve('./src/css/online-only.css')] : [])
                    ],
                },
            }),
        ],
    ],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            tableOfContents: {
                minHeadingLevel: 3,
                maxHeadingLevel: 5,
            },
            navbar: {
                hideOnScroll: false,
                logo: {
                    alt: 'Piiano Logo',
                    href: '/',
                    src: '/img/logo-developers.svg',
                    srcDark: '/img/logo-developers-dark.svg'
                },
                items: [
                    {
                        to: '/introduction',
                        position: 'left',
                        label: 'Overview',
                        activeBaseRegex: `^${currentDocsBasePath}/(?!guides|solutions|tutorials|changelog|cli|api|labs).+`
                    }, {
                        to: '/guides',
                        position: 'left',
                        label: 'Guides',
                    },
                    {
                        to: '/solutions',
                        position: 'left',
                        label: 'Solutions',
                    },
                    // {
                    //     to: '/labs',
                    //     position: 'left',
                    //     label: 'Labs',
                    // },
                    {
                        to: '/api',
                        position: 'left',
                        label: 'API',
                    },
                    {
                        to: '/cli',
                        position: 'left',
                        label: 'CLI',
                    },
                    {
                        to: '/changelog',
                        position: 'left',
                        label: 'Changelog',
                    },
                    {
                        type: 'docsVersionDropdown',
                        position: 'right',
                        dropdownActiveClassDisabled: false,
                    },
                    {
                        to: homeUrl,
                        position: 'right',
                        label: 'Back to Piiano.com',
                        'aria-label': 'Back to Piiano.com'
                    },
                    // {
                    //     href: 'https://discord.com/invite/piiano',
                    //     position: 'right',
                    //     className: 'header-discord-link',
                    //     'aria-label': 'Discord channel',
                    // },

                    // TODO: uncomment when the repo is public.
                    // {
                    //     href: 'https://github.com/piiano/vault',
                    //     position: 'right',
                    //     className: 'header-github-link',
                    //     'aria-label': 'GitHub repository',
                    // },
                ],
            },
            footer: {
                links: [
                    {
                        label: 'Terms',
                        href: `${homeUrl}/terms-of-use/`,
                    }, {
                        label: 'Privacy',
                        href: `${homeUrl}/privacy-policy/`,
                    }, {
                        label: 'Developers',
                        to: '/',
                    }, {
                        label: 'Contact us',
                        href: `${homeUrl}/contact-us/`,
                    }, {
                        label: 'Product',
                        href: `${homeUrl}/product/`,
                    }, {
                        label: 'Blog',
                        href: `${homeUrl}/blog/`,
                    }, {
                        label: 'About',
                        href: `${homeUrl}/company/`,
                    },
                ],
                copyright: `© ${new Date().getFullYear()} <a class="footer__link-item" href="${homeUrl}">Piiano</a>`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
            docs: {
                sidebar: {
                    hideable: true
                }
            },
        }),
    plugins: [
        ['./plugins/dev-proxy', {
            id: 'dev-proxy',
            path: vaultVersionsPath,
            origin: vaultVersionsOrigin
        }],
        ['./plugins/google-tag-manager', {
            id: 'google-tag-manager',
            // When GTM_ID is missing we don't configure tag manager (Google Analytics)
            // This means no Google Analytics in local builds
            // We only set GTM_ID when building the docs for the website in the CI
            // We use the same GTM_ID value for `dev` and `prod` sites and filter dev in GTM based on URL.
            gtmID: process.env.GTM_ID,
        }],
        ['@docusaurus/plugin-content-docs', {
            id: 'guides',
            path: 'guides',
            routeBasePath: 'guides',
            sidebarPath: require.resolve('./sidebars.js'),
        }],
        ['@docusaurus/plugin-content-docs', {
            id: 'solutions',
            path: 'solutions',
            routeBasePath: 'solutions',
            sidebarPath: require.resolve('./sidebars.js'),
        }],
        ['@docusaurus/plugin-content-docs', {
            id: 'tutorials',
            path: 'tutorials',
            routeBasePath: 'tutorials',
            sidebarPath: require.resolve('./sidebars.js'),
        }],
        ['@docusaurus/plugin-content-docs', {
            id: 'labs',
            path: 'labs',
            routeBasePath: 'labs',
            sidebarPath: require.resolve('./sidebars.js'),
        }],
        ['@docusaurus/plugin-content-docs', {
            id: 'cli',
            path: 'cli',
            routeBasePath: 'cli',
            sidebarPath: require.resolve('./sidebars.js'),
        }],
        ['./plugins/guide-snippets', {
            id: 'guide-snippets',
            guidesPath: path.join(__dirname, './plugins/guide-snippets/guides'),
            vars: {
                registry,
                dockerTag,
                runTestArgs: '',
                cliTestLocalAlias: '',
            }
        }],
        ['./plugins/changelog', {
            id: 'changelog',
            path: 'changelog',
            changelogPath: path.join(__dirname, '../CHANGELOG.md'),
            routeBasePath: 'changelog',
            blogTitle: 'Piiano Vault changelog',
            blogDescription: 'Additions and changes to Piiano Vault',
            showReadingTime: false,
            archiveBasePath: null,
            postsPerPage: 20,
            blogSidebarTitle: 'Changelog',
            blogSidebarCount: 'ALL',
            feedOptions: {
                type: 'all',
                title: 'Piiano Vault changelog',
                description:
                    'Additions and changes to Piiano Vault',
                copyright: `Copyright © ${new Date().getFullYear()} Piiano`,
                language: 'en',
            },
        }],
        ['./plugins/elements', {
            id: 'elements',
            openapiFile: '../openapi.yaml',
            openapiReferencesDir: './api/references',
            exportOpenAPI: [
                './static/assets/openapi.yaml',
                './static/assets/openapi.json'
            ],
            path: 'api',
            routeBasePath: 'api',
            sidebarPath: require.resolve('./sidebars.js'),
        }],
    ],

    webpack: {
        jsLoader: (isServer) => ({
            loader: require.resolve('swc-loader'),
            options: {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: true,
                    },
                    target: 'es2017',
                },
                module: {
                    type: isServer ? 'commonjs' : 'es6',
                },
            },
        }),
    },
};

module.exports = config;

/**
 * Parse the URL safely without throwing an error.
 * @param {string} url
 * @return {URL | undefined} URL object if parsed successfully or undefined otherwise
 */
function parseURLSafely(url) {
    if (!url) {
        return
    }
    try {
        return new URL(url)
    } catch (e) {
        logger.error(`invalid URL ${url}`)
        logger.error(e)
    }
}
