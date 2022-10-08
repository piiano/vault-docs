/**
 * By default, Stoplight Elements presents endpoints in the sidebar in the order they appear in the spec `paths` property.
 * Additionally, it orders tags in the order they appear in the spec root `tags` property.
 *
 * The spec produced by Swag keeps the order of `tags` as declared in swag comments but sort endpoints in the `paths` property
 * in an ascending alphabetical order.
 *
 * We want to be able to reorder the endpoints produced by Swag based on our own set of rules using:
 * 1. `x-docs-sidebar-precedence` properties on operations
 * 2. endpoint paths
 * 3. endpoint HTTP method
 *
 * With Swag we can't add extension properties to PathItems, but we can add them to Operations.
 * When `x-docs-sidebar-precedence` appears on an Operation it is used to determine the order of its entire parent PathItem.
 * If multiple operations of the same PathItem have the same `x-docs-sidebar-precedence` the lower value takes precedence.
 * Lower values for `x-docs-sidebar-precedence` will appear higher on the sidebar.
 * If a PathItem have no Operation with `x-docs-sidebar-precedence` property then it will be pushed to the end of the sidebar.
 *
 * Inside each PathItem, the Operations will be ordered using the following rules:
 * If two operations have the `x-docs-sidebar-precedence` property with different values then the operation with lower value will be higher in the sidebar.
 * if at least one of the operations doesn't have `x-docs-sidebar-precedence` or both operations have the same `x-docs-sidebar-precedence`
 * value than ordering will be done based on HTTP method semantics.
 *
 * Operations that act on lists (read list) will be higher on the sidebar, then according to CRUD order: create, read (single), update and delete.
 * When GET and POST are with the same path, it is usually "read list of items" and "create single item" so GET gets precedence over POST.
 * When operating on a  single item the paths typically will have an ID and there won't be a POST operation, so the order
 * is GET (single), PUT, PATCH, DELETE.
 * The rest of the HTTP methods are simply trailing to the commonly used in the order listed bellow.
 */
import {Operation, PathItem, OpenAPISpec, Paths} from "../../src/components/elements/openapi";

const precedenceExtensionPropName = 'x-docs-sidebar-precedence';
export const methodsOrder = ["get", "post", "put", "patch", "delete", "head", "trace", "options"];

export function formatOpenAPISpec(spec: OpenAPISpec = { paths: {} }): OpenAPISpec {
  return {...spec, paths: sortPathItems(spec.paths)};
}

/**
 * Return a new Path object with sorted PathItems and Operations
 * @param paths
 */
function sortPathItems(paths: Paths = {}): Paths {
  const sortedEndpoints = Object.entries(paths)
    .map(([path, pathItem]) => {
      const sortedPathItem = sortPathItemOperations(pathItem);
      const precedence = pathItemPrecedence(pathItem);
      return {path, sortedPathItem, precedence};
    })
    .sort((endpoint1, endpoint2) => endpoint1.precedence - endpoint2.precedence)
    .map(({path, sortedPathItem}) => [path, sortedPathItem]);
  return Object.fromEntries(sortedEndpoints);
}

/**
 * Extract the lower precedence value from all operations of a PathItem.
 * @param pathItem {PathItem}
 * @returns {number}
 */
function pathItemPrecedence(pathItem: PathItem = {}): number {
  const operationsPrecedences = Object.values(pathItem).map(operation => operation[precedenceExtensionPropName] ?? Infinity)
  // Find the minimum precedence value or return Infinity for PathItems with no operations (show last in sidebar)
  return Math.min(Infinity, ...operationsPrecedences);
}

/**
 * Create a new PathItem with reordered operations.
 */
function sortPathItemOperations(pathItem: PathItem = {}): PathItem {
  const sortedPathItemEntries = Object.entries(pathItem)
    .map(([method, operation]) => ({precedence: methodsOrder.indexOf(method.toLowerCase()), method, operation}))
    .sort(comparePathItemOperations)
    .map(({method, operation}) => [method, operation]);
  return Object.fromEntries(sortedPathItemEntries);
}

type OperationAndPrecedence = {
  precedence: number
  operation: Operation
}

/**
 * Compare operations to define their sort order.
 * Return value > 0 to sort operation2 before operation1
 * Return value < 0 to sort operation1 before operation2
 * Return value === 0 to keep the original order
 * @param operation1 {OperationAndPrecedence}
 * @param operation2 {OperationAndPrecedence}
 * @returns {number}
 */
function comparePathItemOperations(operation1: OperationAndPrecedence, operation2: OperationAndPrecedence): number {
  const precedenceExtension1 = operation1.operation[precedenceExtensionPropName];
  const precedenceExtension2 = operation2.operation[precedenceExtensionPropName];
  if (precedenceExtension1 !== undefined && precedenceExtension2 !== undefined && precedenceExtension1 !== precedenceExtension2) {
    return precedenceExtension1 - precedenceExtension2;
  }
  return operation1.precedence - operation2.precedence;
}
