
export type Method = "get" | "post" | "put" | "patch" | "delete" | "head" | "trace" | "options"

export type OpenAPISpec = {
  paths: Paths
}

export type Paths = Record<string, PathItem>

export type PathItem = Partial<Record<Method, Operation>>

export type Operation = {
  operationId?: string
  summary?: string
  tags: Array<string>
  description?: string
}
