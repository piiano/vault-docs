import {OpenAPISpec} from "../../src/components/elements/openapi";
import {slugify} from '@stoplight/elements-core'
import {methodsOrder} from "./openapi-formatter";

export type Route = {
  id: string
  slug: string
  title: string
  description: string
  method: string
  apiPath: string
  tags: Array<string>
}

/**
 * Extract routes from the spec
 */
export function specRoutes(spec: OpenAPISpec = { paths: {} }): Array<Route> {
  return  Object.entries(spec.paths ?? {}).map(([path, pathItem]) => {
    return methodsOrder.filter(method => pathItem[method])
      .map(method => {
        const operation = pathItem[method]
        return {method,
          title: operation.summary || path,
          id: operation.operationId,
          description: operation.description,
          apiPath: path,
          tags: operation.tags ?? [],
          slug: `/operations/${slugify(operation.operationId)}`
        }
      })
  }).flat();
}
