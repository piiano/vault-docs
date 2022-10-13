Returns a [paginated list](/api/pagination) of objects, with property values, from a collection that satisfies a query.

The role performing this operation must have all the following:
- The `CapDataSearcher` capability.
- Policies:
  + At least one allowing policy and no denying policies for the `read` operation for each of the collection properties
    specified in the `props` query parameter.
  + At least one allowing policy and no denying policies for the `search` operation for each of the collection
    properties
    specified in the `query` body parameter.

See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.

**Warning**: Use of the `unsafe` option, to include all object property values, may expose more private information than is required, use with caution..