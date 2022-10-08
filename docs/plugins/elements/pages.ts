import yaml from "yaml";
import {Route} from "@site/plugins/elements/openapi-routes";
import {parseMarkdownString} from "@docusaurus/utils";

export function frontMatter(keyValues: Record<string, any>) {
  return `---
${yaml.stringify(keyValues)}---
`
}

export function apiPage(route: Route, sidebarPosition: number): string {
  const description = parseMarkdownString(route.description).excerpt
  return `${frontMatter({
    // position in the sidebar in the category (tag)
    sidebar_position: sidebarPosition,
    // adds css classes for the http method badge in the sidebar
    sidebar_class_name: `api-endpoint http-${route.method.toLowerCase()}`,
    // api pages are elements component, so we don't want the toc on the right side.
    hide_table_of_contents: true,
    // must be same as expected by stoplight elements in order to use `history` router
    slug: route.slug,
    // get from the API description markdown a short description
    description,
    // the sidebar label and page title are the operation summary
    sidebar_label: route.title,
    title: `${route.title} | API`,

    // we use the custom props to dynamically build the cards in the category index pages
    sidebar_custom_props: {
      method: route.method,
      apiPath: route.apiPath,
      description
    },
  })}
import Elements from "@site/src/components/elements";

# ${route.title}

<Elements path={'${route.slug}'}/>
`
}

export function apiCategoryPage(tag) {
  return `${frontMatter({
    title: `${tag.name} | API`
  })}
import APICategoryIndex from '@site/src/components/APICategoryIndex';

# ${tag.name}

${tag.description}

<APICategoryIndex />
`;
}
